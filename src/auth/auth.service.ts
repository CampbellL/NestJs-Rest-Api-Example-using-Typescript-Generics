import { Injectable } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./auth.dto";
import { User } from "./user/user.entity";

/**
 * @class AuthService
 * @description Contains method definitions for everything authentication related.
 * @property userService UserService provided by dependency injection authModule.
 * @property jwtService JwtService provided by dependency injection from the authModule.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * @description Registers a user using the userService registerUser method
   *  @param userDTO RegisterDto UserDataTransferObject
   */
  public async register(userDTO: RegisterDto): Promise<void> {
    await this.usersService.registerUser(userDTO);
  }
  /**
   * @description Registers a user using the userService registerUser method
   *  @param username Username of the user to be validated.
   *  @param password Password of the user to be validated.
   *  @return returns a user if found.
   *  @throws HttpException if no user is found with the given credentials.
   */
  public async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.findByLogin({ username, password });
  }

  /**
   * @description Registers a user using the userService registerUser method
   *  @param user Takes in a user object.
   *  @return returns a user if found.
   *  @throws HttpException if no user is found with the given credentials.
   */
  public async login(user: User): Promise<object> {
    const payload = { username: user.username, role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
