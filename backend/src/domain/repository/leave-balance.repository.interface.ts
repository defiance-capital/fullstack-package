import { LeaveBalanceEntity } from '../entity/leave-balance.entity';

export interface ILeaveBalanceRepository {
  findByUserId(userId: number): Promise<LeaveBalanceEntity | null>;
}

export abstract class ILeaveBalanceRepository {}
