import { LeaveRequestEntity, LeaveRequestStatus } from '@/domain/entity/leave-request.entity';
import {
  ILeaveRequestRepository,
  ListAllOptions,
} from '@/domain/repository/leave-request.repository.interface';
import { Between, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { BaseRepository } from './base.repository';

export class LeaveRequestRepository
  extends BaseRepository<LeaveRequestEntity>
  implements ILeaveRequestRepository
{
  static getEntityTarget() {
    return LeaveRequestEntity;
  }

  async listAll(options: ListAllOptions): Promise<LeaveRequestEntity[]> {
    const where: FindOptionsWhere<LeaveRequestEntity> = {};

    if (options?.creatorId) {
      where.creatorId = options.creatorId;
    }

    if (options?.status) {
      where.status = options.status;
    }

    if (options?.startDate && options?.endDate) {
      where.startDate = Between(options.startDate, options.endDate);
    } else if (options?.startDate) {
      where.startDate = MoreThanOrEqual(options.startDate);
    } else if (options?.endDate) {
      where.startDate = LessThanOrEqual(options.endDate);
    }

    return this.find({ where, order: { [options.sortBy]: options.sortDir } });
  }

  async updateStatus(id: number, status: LeaveRequestStatus, approverId: number): Promise<boolean> {
    return (await this.update(id, { status, approverId })).affected !== 0;
  }

  async createRequest(data: LeaveRequestEntity): Promise<LeaveRequestEntity> {
    return await this.save(data);
  }

  async existsByUserIdAndStartDate(userId: number, startDate: Date): Promise<boolean> {
    return this.existsBy({
      creatorId: userId,
      startDate: LessThanOrEqual(startDate),
      endDate: MoreThanOrEqual(startDate),
    });
  }
}
