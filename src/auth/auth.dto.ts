import { Role } from "./role.enum";

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  emailAddress: string;
  mustChangePassword: boolean;
  role: Role;
}
