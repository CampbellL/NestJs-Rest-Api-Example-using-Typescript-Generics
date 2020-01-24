import { RestEntity } from "./rest.entity";
import { RestControllerUnrestricted } from "./RestControllerUnrestricted";
import { Delete, Get, Post } from "@nestjs/common";

export class RestController<T> extends RestControllerUnrestricted<RestEntity> {
  @Get()
  protected async findAll(): Promise<RestEntity[]> {
    return super.findAll();
  }
  @Get(":id")
  protected async findById(id: number): Promise<RestEntity> {
    return super.findById(id);
  }

  @Get(":page/:items")
  protected async findAllPaginate(
    page: number,
    items: number
  ): Promise<RestEntity[]> {
    return super.findAllPaginate(page, items);
  }
  @Post()
  protected async create(entity: RestEntity): Promise<number> {
    return super.create(entity);
  }
  @Delete(":id")
  protected async delete(id: number): Promise<void> {
    super.delete(id);
  }

  protected async update(entity: RestEntity): Promise<RestEntity> {
    return super.update(entity);
  }
}
