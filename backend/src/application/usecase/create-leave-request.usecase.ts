import { LeaveRequestEntity } from '@/domain/entity/leave-request.entity';
import { ILeaveRequestRepository } from '@/domain/repository/leave-request.repository.interface';
import { Injectable } from '@nestjs/common';
import {
  CreateLeaveRequestCommand,
  CreateLeaveRequestResult,
} from '../dto/create-leave-request.command';
import { ResourceConflictException } from '../exception/resource-conflict.exception';
import { InvalidDataException } from '../exception/invalid-data.exception';

@Injectable()
export class CreateLeaveRequestUseCase {
  constructor(private readonly leaveRequestRepo: ILeaveRequestRepository) {}

  async execute(command: CreateLeaveRequestCommand): Promise<CreateLeaveRequestResult> {
    if (command.leaveDays % 0.5 !== 0) {
      throw new InvalidDataException('Leave days must be in increments of 0.5.');
    }

    command.startDate.setHours(0, 0, 0, 0);
    const existingRequest = await this.leaveRequestRepo.existsByUserIdAndStartDate(
      command.userId,
      command.startDate
    );

    if (existingRequest) {
      throw new ResourceConflictException('You have already requested leave for this period.');
    }

    const request = await this.leaveRequestRepo.createRequest(
      new LeaveRequestEntity({
        creatorId: command.userId,
        description: command.description,
        type: command.type,
        startDate: command.startDate,
        leaveDays: command.leaveDays,
      })
    );

    return {
      id: request.id,
      description: request.description,
      type: request.type,
      status: request.status,
      startDate: request.startDate,
      endDate: request.endDate,
      leaveDays: request.leaveDays,
    };
  }
}
