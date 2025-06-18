import { render, screen } from "@testing-library/react";

function Hello() {
  return <h1>Hello, World!</h1>;
}

test("renders Hello component", () => {
  render(<Hello />);
  expect(screen.getByText("Hello, World!")).toBeDefined();
});
