import { db } from "../db";
import { FriendshipRequest, SuyuUser } from "../schema";

export const userRepo = db.getRepository(SuyuUser);
export const friendshipRepo = db.getRepository(FriendshipRequest);
