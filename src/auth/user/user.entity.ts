import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role.enum';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;
	@Index({ unique: true })
	@Column('varchar', { length: 255 })
	username: string;

	@Column('varchar', { length: 55 })
	firstName: string;

	@Column('varchar', { length: 55 })
	lastName: string;

	@Column('varchar', { length: 255 })
	emailAddress: string;

	@Column('varchar', { length: 255 })
	password: string;

	@Column('varchar', { length: 255 })
	salt: string;

	@Column('varchar', { length: 255 })
	activationKey: string;

	@Column()
	isActivated: boolean;

	@Column()
	role: Role;

	@Column()
	isBlocked: boolean;

	@Column()
	mustChangePassword: boolean;

	@Column()
	lastLogin: Date;
}
