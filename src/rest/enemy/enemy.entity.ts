import { Column, Entity } from "typeorm";
import { RestEntity } from "../rest.entity";

@Entity()
export class Enemy extends RestEntity {
  @Column()
  name: string;
  @Column()
  health: number;
  @Column()
  positionX: number;
  @Column()
  positionY: number;
  @Column({ default: "test.png" })
  image: string;
}
