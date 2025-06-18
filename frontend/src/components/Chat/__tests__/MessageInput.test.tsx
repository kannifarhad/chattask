import { render, screen, fireEvent } from "@testing-library/react";
import MessageInput from "../MessageInput"; 
import { useSocketContext } from "../../../contexts/SocketContext";

// Mock socket
const emitMock = jest.fn();

// Mock TypingIndicator since we don't test it here
jest.mock("../TypingIndicator", () => () => <div data-testid="typing-indicator" />);

// Mock socket context
jest.mock("../../../contexts/SocketContext", () => ({
  useSocketContext: jest.fn(),
}));

describe("MessageInput", () => {
  beforeEach(() => {
    emitMock.mockClear();
    (useSocketContext as jest.Mock).mockReturnValue({ emit: emitMock });
  });

  test("renders input and send button", () => {
    render(<MessageInput />);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  test("typing emits 'typing' and clears emits 'stop-typing'", () => {
    render(<MessageInput />);
    const input = screen.getByTestId("message-input") as HTMLInputElement;

    // Simulate typing
    fireEvent.input(input, { target: { value: "Hello" } });
    expect(emitMock).toHaveBeenCalledWith("typing");

    // Simulate clearing
    fireEvent.input(input, { target: { value: "" } });
    expect(emitMock).toHaveBeenCalledWith("stop-typing");
  });

  test("clicking send emits message and clears input", () => {
    render(<MessageInput />);
    const input = screen.getByTestId("message-input") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /send/i });

    fireEvent.input(input, { target: { value: "Test message" } });
    fireEvent.click(button);

    expect(emitMock).toHaveBeenCalledWith("message", "Test message");
    expect(emitMock).toHaveBeenCalledWith("stop-typing");
    expect(input.value).toBe("");
  });

  test("pressing Enter key sends message", () => {
    render(<MessageInput />);
    const input = screen.getByTestId("message-input") as HTMLInputElement;

    fireEvent.input(input, { target: { value: "Enter key test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(emitMock).toHaveBeenCalledWith("message", "Enter key test");
    expect(emitMock).toHaveBeenCalledWith("stop-typing");
  });

  test("send is disabled if input is empty", () => {
    render(<MessageInput />);
    const button = screen.getByRole("button", { name: /send/i });
    expect(button).toBeDisabled();
  });

  test("does not exceed max length", () => {
    render(<MessageInput />);
    const input = screen.getByTestId("message-input") as HTMLInputElement;
    const longText = "x".repeat(350);

    fireEvent.input(input, { target: { value: longText } });

    // Input value should be cut by browser, not by component code,
    // so we only check the prop presence.
    expect(input.maxLength).toBe(300);
  });
});
