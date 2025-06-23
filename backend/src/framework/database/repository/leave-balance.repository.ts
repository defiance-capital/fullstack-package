import { LeaveBalanceEntity } from '@/domain/entity/leave-balance.entity';
import { ILeaveBalanceRepository } from '@/domain/repository/leave-balance.repository.interface';
import { BaseRepository } from './base.repository';

export class LeaveBalanceRepository
  extends BaseRepository<LeaveBalanceEntity>
  implements ILeaveBalanceRepository
{
  static getEntityTarget() {
    return LeaveBalanceEntity;
  }

  findByUserId(userId: number): Promise<LeaveBalanceEntity | null> {
    return this.findOneBy({ userId });
  }
}
