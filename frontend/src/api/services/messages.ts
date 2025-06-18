import axiosClient from "../clients/axios";
import type { MessageType } from "../../types";

interface FetchMessagesParams {
  page: number;
  limit: number;
}

export const fetchMessages = async ({ page, limit }: FetchMessagesParams): Promise<MessageType[]> => {
  const res = await axiosClient.get("/chat/messages", {
    params: { page, limit },
  });

  return res.data;
};
