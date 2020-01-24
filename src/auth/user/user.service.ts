import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { LoginDto, RegisterDto } from "../auth.dto";
import * as crypto from "crypto";

@Injectable()
/**
 * @description Service to interact with the UserEntity.
 * It is used internally by the AuthService but it also includes the necessary
 * Methods for the User management components.
 * **/
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor() {}

  /**
   * @description Sanitize a user for usage in api
   * @param user User to be sanitized
   **/
  private static sanitizeUser(user: User): User {
    const sanitizedUser = user;
    delete sanitizedUser.password;
    delete sanitizedUser.salt;
    delete sanitizedUser.activationKey;
    return sanitizedUser;
  }

  private async userExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ username });
    return !!user;
  }

  /**
   * @description Registers a User in the database
   * @param userDto Register Data Transfer Object
   **/
  public async registerUser(userDto: RegisterDto) {
    const {
      username,
      password,
      firstName,
      lastName,
      emailAddress,
      mustChangePassword
    } = userDto;
    if (await this.userExists(username)) {
      throw new HttpException(
        "User already exists",
        HttpStatus.METHOD_NOT_ALLOWED
      );
    }
    const user = new User();
    user.username = username;
    user.salt = crypto.randomBytes(32).toString("hex");
    user.password = crypto
      .pbkdf2Sync(password, user.salt, 10000, 100, "sha512")
      .toString("hex");
    user.firstName = firstName;
    user.lastName = lastName;
    user.emailAddress = emailAddress;
    user.mustChangePassword = mustChangePassword;
    user.activationKey = "key";
    user.isActivated = false;
    user.isBlocked = false;
    user.lastLogin = new Date();
    user.role = userDto.role;
    await this.userRepository.save(user);
  }

  /**
   * @description Finds a user by its Login Information. This method should only be used for authentication
   * purposes as it also updates the LastLogin.
   * @return Promise<User> Returns a Promise of a user if any is found.
   * @throws HttpException In case user is not found
   * @param userDTO Login Data Transfer Object
   * **/
  public async findByLogin(userDTO: LoginDto): Promise<User> {
    const { username, password } = userDTO;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    }
    const hash = crypto
      .pbkdf2Sync(password, user.salt, 10000, 100, "sha512")
      .toString("hex");
    if (hash !== user.password) {
      throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    }
    user.lastLogin = new Date();
    await this.userRepository.save(user);
    return UserService.sanitizeUser(user);
  }
  /**
   * @description Gets all users from the database and sanitizes them for api usage.
   * @return Promise<User> Returns an array of all users found.
   * **/
  public async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map(e => UserService.sanitizeUser(e));
  }

  public async delete(id: number) {
    await this.userRepository.delete(id);
  }
}
