import { useMemo } from "react";
import { getUserInfo } from "../utils/auth";

export const useGetUserInfo = () => {
  const userInfo = useMemo(() => getUserInfo(), []);

  return userInfo;
};
