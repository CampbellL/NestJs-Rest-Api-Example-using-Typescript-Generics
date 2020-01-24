import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RestController } from '../rest.controller';
import { Enemy } from './enemy.entity';
import { EnemyService } from './enemy.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('enemy')
export class EnemyController extends RestController<Enemy> {
	constructor(private enemyService: EnemyService) {
		super(enemyService);
	}

	@Get('image/:image')
	public getImage(@Param('image') image, @Res() res) {
		res.sendFile(image, { root: './uploads/enemy' });
	}

	@Post('upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './uploads/gallery',
				filename: (req, file, cb) => {
					cb(null, file.originalname);
				},
			}),
		}),
	)
	async uploadFile(@UploadedFile() file, @Req() req) {
		const enemy = await this.enemyService.get(req.body.enemyId);
		enemy.name = file.filename;
		await this.enemyService.update(enemy);
	}
}
