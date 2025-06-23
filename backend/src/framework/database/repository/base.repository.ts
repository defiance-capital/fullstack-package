import { Injectable } from '@nestjs/common';
import { EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(manager: EntityManager) {
    super(new.target.getEntityTarget(), manager);
  }

  static getEntityTarget(): EntityTarget<any> {
    throw new Error('getTarget method must be implemented in the derived class');
  }
}
