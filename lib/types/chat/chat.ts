import { MinimalUser } from "../user/minimal-user";
import { Message } from "./message";

export type Chat = {
    user: MinimalUser;
    messages: Message[];
};
