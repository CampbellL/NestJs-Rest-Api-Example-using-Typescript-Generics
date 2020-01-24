import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnemyController } from "./enemy/enemy.controller";
import { Enemy } from "./enemy/enemy.entity";
import { EnemyService } from "./enemy/enemy.service";
import { AppController } from "src/app.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Enemy])],
  controllers: [EnemyController, AppController],
  providers: [EnemyService],
  exports: [EnemyService]
})
export class RestModule {}
