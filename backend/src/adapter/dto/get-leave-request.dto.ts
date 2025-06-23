import { LeaveRequestStatus } from '@/domain/entity/leave-request.entity';
import { IsDate, IsEnum, IsIn, IsOptional } from 'class-validator';

export class GetLeaveRequestReq {
  @IsOptional()
  @IsEnum(LeaveRequestStatus)
  status?: LeaveRequestStatus;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsIn(['status', 'startDate'])
  sortBy: 'status' | 'startDate';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDir: 'ASC' | 'DESC';
}
