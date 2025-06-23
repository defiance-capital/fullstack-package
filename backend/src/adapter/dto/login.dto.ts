import { IsString } from 'class-validator';

export class LoginReq {
  @IsString()
  username: string;
}
