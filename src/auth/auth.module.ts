import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

/**
 * @class AuthModule
 * @description Module used for authentication.
 * It depends on {@link ConfigModule } and {@link PassportModule} for authentication.
 */
@Module({
	imports: [
		ConfigModule.forRoot(),
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWTSECRET,
			signOptions: { expiresIn: '15m' },
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
