import type { Role } from "$types/db";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SuyuUser extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text")
	username: string;

	@Column("text")
	displayName: string;

	@Column("text")
	avatarUrl: string;

	@Column("text")
	roles: string;

	@Column("text", {
		select: false,
	})
	apiKey: string;

	@Column("text", {
		select: false,
	})
	email: string;
}
