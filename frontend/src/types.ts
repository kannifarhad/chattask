type MessageActionType = "message" | "user-joined" | "user-left";

export type BaseMessageType = {
  id: number;
  createdAt: string;
  content: string;
  username: string;
};

export type MessageType = {
  action?: MessageActionType;
} & BaseMessageType;