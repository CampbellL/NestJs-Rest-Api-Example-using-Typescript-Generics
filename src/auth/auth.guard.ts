import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor() {}

	canActivate(context: ExecutionContext): boolean {
		return true;
	}
}
