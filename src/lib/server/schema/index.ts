import type { Role } from "$types/db";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SuyuUser {
	@PrimaryColumn()
	id: string;

	@Column()
	username: string;

	@Column()
	displayName: string;

	@Column()
	avatarUrl: string;

	@Column()
	roles: Role[];
}
