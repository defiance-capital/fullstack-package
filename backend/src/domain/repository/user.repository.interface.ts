import { UserEntity } from '../entity/user.entity';

export interface IUserRepository {
  findByUsername(username: string): Promise<UserEntity | null>;
}

export abstract class IUserRepository {}
