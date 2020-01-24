import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RestEntity } from './rest.entity';
import { IRestService } from './IRestService';

export class RestControllerUnrestricted<T extends RestEntity> {
	constructor(private readonly restService: IRestService<T>) {}

	protected async findAll(): Promise<T[]> {
		return this.restService.getAll();
	}

	protected async findById(@Param('id') id: number): Promise<T> {
		return this.restService.get(id);
	}

	protected async findAllPaginate(@Param('page') page: number, @Param('items') items: number) {
		return this.restService.getAllPaginate(page, items);
	}

	protected async create(@Body() entity: T): Promise<number> {
		return this.restService.create(entity);
	}

	protected async delete(@Param('id') id: number) {
		this.restService.delete(id);
	}

	protected async update(@Body() entity: T): Promise<T> {
		return this.restService.update(entity);
	}
}
