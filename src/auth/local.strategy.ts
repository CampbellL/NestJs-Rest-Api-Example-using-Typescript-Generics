import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user/user.entity';

/**
 * @class LocalStrategy
 * @description {@link Strategy} to verify user using a username and password.
 **/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}
	/**
	 * @description Validate user credentials using the {@link AuthService}.
	 * @param username Username of the user to validate.
	 * @param password Password of the user to validate.
	 * @return Promise<User
	 */
	public async validate(username: string, password: string): Promise<User> {
		const user = await this.authService.validateUser(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
