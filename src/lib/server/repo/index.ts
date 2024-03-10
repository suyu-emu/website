import { db } from "../db";
import { SuyuUser } from "../schema";

export const userRepo = db.getRepository(SuyuUser);
