import { Message } from "./Message";
import { User } from "./User";

export type Session = {
  id?: string;
  participants: string[];
  messages?: Message[];
};
