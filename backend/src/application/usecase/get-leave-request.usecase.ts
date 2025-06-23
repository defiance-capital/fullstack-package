import { UserRole } from '@/domain/entity/user.entity';
import {
  ILeaveRequestRepository,
  ListAllOptions,
} from '@/domain/repository/leave-request.repository.interface';
import { Injectable } from '@nestjs/common';
import { GetLeaveRequestQuery, GetLeaveRequestResult } from '../dto/get-leave-request.query';

@Injectable()
export class GetLeaveRequestUseCase {
  constructor(private readonly leaveRequestRepo: ILeaveRequestRepository) {}

  async execute(query: GetLeaveRequestQuery): Promise<GetLeaveRequestResult> {
    const options: ListAllOptions = { ...query.options };
    if (options.startDate) {
      options.startDate.setHours(0, 0, 0, 0);
    }
    if (options.endDate) {
      options.endDate.setHours(0, 0, 0, 0);
    }
    if (query.user.role === UserRole.Employee) {
      options.creatorId = query.user.id;
    }

    const requests = await this.leaveRequestRepo.listAll(options);

    return {
      items: requests.map((request) => ({
        id: request.id,
        description: request.description,
        type: request.type,
        status: request.status,
        startDate: request.startDate,
        endDate: request.endDate,
        leaveDays: request.leaveDays,
        creatorId: request.creatorId,
      })),
    };
  }
}
