import { LeaveRequestStatus, LeaveRequestType } from '@/domain/entity/leave-request.entity';

export class CreateLeaveRequestCommand {
  userId: number;
  description: string;
  type: LeaveRequestType;
  startDate: Date;
  leaveDays: number;
}

export class CreateLeaveRequestResult {
  id: number = 1;
  description: string;
  type: LeaveRequestType;
  status: LeaveRequestStatus;
  startDate: Date;
  endDate: Date;
  leaveDays: number = 1;
}
