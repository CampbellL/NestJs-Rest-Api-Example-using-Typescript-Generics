import { Controller, Get, Render, Param } from "@nestjs/common";
import { EnemyService } from "./rest/enemy/enemy.service";
@Controller()
export class AppController {
  constructor(private EnemyService: EnemyService) {}
  @Get()
  @Render("enemies")
  async getEnemies() {
    const enemies = await this.EnemyService.getAll();
    return { enemies };
  }
  @Get("enemies/:id")
  @Render("enemy")
  async getEnemyDetail(@Param("id") id) {
    const enemy = await this.EnemyService.get(Number(id));
    return { enemy };
  }
}
