import { BadGatewayException, Injectable } from '@nestjs/common';
import { RestEntity } from './rest.entity';
import { DeleteResult, Repository } from 'typeorm';
import { IRestService } from './IRestService';
import * as _ from 'lodash';

@Injectable()
export class RestService<T extends RestEntity> implements IRestService<T> {
	constructor(private readonly genericRepository: Repository<T>) {}

	public create(entity: any): Promise<number> {
		try {
			return new Promise<number>((resolve, reject) => {
				this.genericRepository
					.save(entity)
					.then(created => resolve(created.id))
					.catch(err => reject(err));
			});
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	public getAll(): Promise<T[]> {
		try {
			// @ts-ignore
			return this.genericRepository.find({ order: { createdAt: 'DESC' } }) as Promise<T[]>;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	public getAllPaginate(page: number, itemsPerPage: number): Promise<T[]> {
		try {
			return this.genericRepository.find({
				// @ts-ignore
				order: { createdAt: 'DESC' },
				skip: page * itemsPerPage,
				take: itemsPerPage,
			}) as Promise<T[]>;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	public get(id: number): Promise<T> {
		try {
		} catch (error) {
			throw new BadGatewayException(error);
		}
		return this.genericRepository.findOne(id) as Promise<T>;
	}

	public delete(id: number): Promise<DeleteResult> {
		try {
			return this.genericRepository.delete(id);
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	public update(entity: any): Promise<any> {
		try {
			return new Promise<any>((resolve, reject) => {
				this.genericRepository
					.findOne(entity.id)
					.then(responseGet => {
						try {
							if (responseGet == null) {
								reject('Not existing');
							}
							const retrievedEntity: any = responseGet as any;
							const entityToSave = _.merge(retrievedEntity, entity);
							this.genericRepository
								.save(entityToSave)
								.then(response => resolve(response))
								.catch(err => reject(err));
						} catch (e) {
							reject(e);
						}
					})
					.catch(err => reject(err));
			});
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
