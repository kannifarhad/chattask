/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { setSessionToken, removeSessionToken, getSessionToken } from "../utils/auth";
import { loginRequest } from "../api/services/auth";

type SessionContextType = {
  token: string | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
};

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => getSessionToken());

  const login = async (username: string) => {
    const token = await loginRequest(username);
    setSessionToken(token);
    setToken(token);
  };

  const logout = () => {
    removeSessionToken();
    setToken(null);
  };

  useEffect(() => {
    setToken(getSessionToken());
  }, []);

  return <SessionContext.Provider value={{ token, login, logout }}>{children}</SessionContext.Provider>;
};
