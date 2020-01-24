import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

/**
 * @class AuthController
 * @description Contains route definitions for everything auth related.
 * @property authService AuthService provided by dependency injection
 * through the Auth module.
 **/
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * @description API Endpoint to register a new user to the app.
   * @param requestBody Takes a {@link RegisterDto} through the post request.
   */
  @Post("register")
  public async register(@Body() requestBody: RegisterDto) {
    await this.authService.register(requestBody);
  }
  /**
   * @description API Endpoint for login. Uses {@link LocalStrategy} to verify if the user credentials are correct.
   * If this passes it will use the {@link AuthService} to return a new access token to the user.
   * @param req Takes a request object. This will include the user object returned by the Auth guard.
   * @throws UnauthorizedException In case of invalid credentials
   */
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  public async resetPassword() {}
}
