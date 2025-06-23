import { ActionType } from '../constants/actionType';
import { LeaveStatus } from '../constants/leaveStatus';
import { LeaveType } from '../constants/leaveType';

export interface LeaveRequest {
  id: number;
  startDate: string;
  leaveDays: number;
  description: string;
  type: LeaveType;
  status: LeaveStatus;
  creatorId: number;
}

export interface LeaveFilters {
  status?: LeaveStatus;
  startDate?: string;
  endDate?: string;
  sortBy: 'status' | 'startDate';
  sortDir: 'ASC' | 'DESC';
}

export interface UpdateLeaveRequestParams {
  id: number;
  action: ActionType;
}
