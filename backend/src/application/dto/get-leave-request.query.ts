import { LeaveRequestStatus, LeaveRequestType } from '@/domain/entity/leave-request.entity';
import { AuthenticatedUser } from '../port/auth.user.interface';

export class GetLeaveRequestQuery {
  user: AuthenticatedUser;

  options: {
    status?: LeaveRequestStatus;
    startDate?: Date;
    endDate?: Date;
    sortBy: 'status' | 'startDate';
    sortDir: 'ASC' | 'DESC';
  };
}

class GetLeaveRequestResultItem {
  id: number = 1;
  description: string;
  type: LeaveRequestType;
  status: LeaveRequestStatus;
  startDate: Date;
  endDate: Date;
  leaveDays: number = 1;
  creatorId: number;
}

export class GetLeaveRequestResult {
  items: GetLeaveRequestResultItem[];
}
