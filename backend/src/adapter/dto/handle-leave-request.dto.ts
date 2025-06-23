import { HandleLeaveRequestAction } from '@/application/dto/handle-leave-request.command';
import { IsEnum } from 'class-validator';

export class HandleLeaveRequestReq {
  @IsEnum(HandleLeaveRequestAction)
  action: HandleLeaveRequestAction;
}
