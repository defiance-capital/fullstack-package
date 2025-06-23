import { UserEntity } from '@/domain/entity/user.entity';
import { IUserRepository } from '@/domain/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {
  static getEntityTarget() {
    return UserEntity;
  }

  findByUsername(username: string): Promise<UserEntity | null> {
    return this.findOneBy({ username });
  }
}
