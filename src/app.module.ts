import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RestModule } from "./rest/rest.module";
import { UserModule } from "./auth/user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./auth/user/user.entity";
import { Enemy } from "./rest/enemy/enemy.entity";
import { EnemyService } from "./rest/enemy/enemy.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.DBTYPE,
      host: process.env.DBHOST,
      port: 3306,
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DBDATABASE,
      entities: [User, Enemy],
      synchronize: true
    }),
    UserModule,
    AuthModule,
    RestModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
