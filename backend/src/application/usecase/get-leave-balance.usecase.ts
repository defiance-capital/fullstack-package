import { ILeaveBalanceRepository } from '@/domain/repository/leave-balance.repository.interface';
import { Injectable } from '@nestjs/common';
import { GetLeaveBalanceResult } from '../dto/get-leave-balance.query';
import { ResourceNotFoundException } from '../exception/resource-not-found.exception';

@Injectable()
export class GetLeaveBalanceUseCase {
  constructor(private readonly leaveBalanceRepo: ILeaveBalanceRepository) {}

  async execute(userId: number): Promise<GetLeaveBalanceResult> {
    const leaveBalance = await this.leaveBalanceRepo.findByUserId(userId);

    if (!leaveBalance) {
      throw new ResourceNotFoundException('balance');
    }

    return {
      balance: leaveBalance.balance,
      updatedAt: leaveBalance.updatedAt,
    };
  }
}
