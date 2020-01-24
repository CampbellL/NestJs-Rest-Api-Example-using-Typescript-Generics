import { Injectable } from "@nestjs/common";
import { Enemy } from "./enemy.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RestService } from "../rest.service";

@Injectable()
export class EnemyService extends RestService<Enemy> {
  constructor(
    @InjectRepository(Enemy)
    private readonly enemyRepository: Repository<Enemy>
  ) {
    super(enemyRepository);
  }
}
