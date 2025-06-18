import { TOKEN_KEY } from "../constants";

export const getSessionToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setSessionToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);
export const removeSessionToken = () => sessionStorage.removeItem(TOKEN_KEY);

// Minimal JWT decoding (no verification, just base64 decode)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseJwt = (token: string): Record<string, any> | null => {
  try {
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(base64Payload);
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.warn("Failed to decode JWT", err);
    return null;
  }
};

export const getUserInfo = () => {
  try {
    const token = getSessionToken();
    if (!token) {
      throw new Error("Token has not been set");
    }
    const payload = parseJwt(token);
    if (!payload || typeof payload !== "object") {
      throw new Error("Wrong token");
    }
    return {
      username: String(payload.username),
    };
  } catch (err) {
    console.log(err);;
    return { username: null };
  }
};
