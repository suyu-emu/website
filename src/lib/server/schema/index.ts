import type { Role } from "$types/db";
import { BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

	@Column("json")
	roles: Role[];

	@Column("text", {
		select: false,
	})
	apiKey: string;

	@Column("text", {
		select: false,
	})
	email: string;

	@Column("text", {
		select: false,
	})
	password: string;

	@ManyToMany(() => SuyuUser)
	friends: SuyuUser[];
}

export class FriendshipRequest extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@OneToOne(() => SuyuUser)
	from: SuyuUser;

	@OneToOne(() => SuyuUser)
	to: SuyuUser;
}
