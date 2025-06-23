import { LeaveRequestEntity, LeaveRequestStatus } from '../entity/leave-request.entity';

export type LeaveRequestSortableColumns = keyof Pick<LeaveRequestEntity, 'status' | 'startDate'>;

export interface ListAllOptions {
  creatorId?: number;
  status?: LeaveRequestStatus;
  startDate?: Date;
  endDate?: Date;
  sortBy: LeaveRequestSortableColumns;
  sortDir: 'ASC' | 'DESC';
}

export interface ILeaveRequestRepository {
  listAll(options: ListAllOptions): Promise<LeaveRequestEntity[]>;
  updateStatus(id: number, status: LeaveRequestStatus, approverId: number): Promise<boolean>;
  createRequest(data: LeaveRequestEntity): Promise<LeaveRequestEntity>;
  existsByUserIdAndStartDate(userId: number, startDate: Date): Promise<boolean>;
}

export abstract class ILeaveRequestRepository {}
