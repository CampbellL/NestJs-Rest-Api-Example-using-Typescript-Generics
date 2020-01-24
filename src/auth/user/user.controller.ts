import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}
	@Get('')
	public show() {
		return this.userService.getAll();
	}
	@Delete(':id')
	public async delete(@Param() params) {
		await this.userService.delete(params.id);
	}
}
