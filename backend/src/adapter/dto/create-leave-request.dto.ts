import { LeaveRequestType } from '@/domain/entity/leave-request.entity';
import { IsDate, IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateLeaveRequestReq {
  @IsString()
  description: string;

  @IsEnum(LeaveRequestType)
  type: LeaveRequestType;

  @IsDate()
  startDate: Date;

  @IsPositive()
  @IsNumber()
  leaveDays: number;
}
