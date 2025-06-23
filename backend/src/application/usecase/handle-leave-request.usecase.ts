import { LeaveRequestStatus } from '@/domain/entity/leave-request.entity';
import { ILeaveRequestRepository } from '@/domain/repository/leave-request.repository.interface';
import { Injectable } from '@nestjs/common';
import {
  HandleLeaveRequestAction,
  HandleLeaveRequestCommand,
} from '../dto/handle-leave-request.command';
import { ResourceNotFoundException } from '../exception/resource-not-found.exception';

@Injectable()
export class HandleLeaveRequestUseCase {
  constructor(private readonly leaveRequestRepo: ILeaveRequestRepository) {}

  async execute(command: HandleLeaveRequestCommand): Promise<boolean> {
    const status: LeaveRequestStatus = this.mapActionToStatus(command.action);
    const result = await this.leaveRequestRepo.updateStatus(command.id, status, command.managerId);
    if (!result) {
      throw new ResourceNotFoundException('leave request');
    }
    return result;
  }

  private mapActionToStatus(action: HandleLeaveRequestAction): LeaveRequestStatus {
    switch (action) {
      case HandleLeaveRequestAction.REJECT:
        return LeaveRequestStatus.REJECTED;
      default:
        return LeaveRequestStatus.APPROVED;
    }
  }
}
