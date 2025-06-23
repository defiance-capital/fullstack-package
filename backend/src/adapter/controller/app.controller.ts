import { CreateLeaveRequestResult } from '@/application/dto/create-leave-request.command';
import { GetLeaveBalanceResult } from '@/application/dto/get-leave-balance.query';
import { GetLeaveRequestResult } from '@/application/dto/get-leave-request.query';
import { LoginResult } from '@/application/dto/login.command';
import { AuthenticatedUser } from '@/application/port/auth.user.interface';
import { CreateLeaveRequestUseCase } from '@/application/usecase/create-leave-request.usecase';
import { GetLeaveBalanceUseCase } from '@/application/usecase/get-leave-balance.usecase';
import { GetLeaveRequestUseCase } from '@/application/usecase/get-leave-request.usecase';
import { HandleLeaveRequestUseCase } from '@/application/usecase/handle-leave-request.usecase';
import { LoginUseCase } from '@/application/usecase/login.usecase';
import { UserRole } from '@/domain/entity/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateLeaveRequestReq } from '../dto/create-leave-request.dto';
import { GetLeaveRequestReq } from '../dto/get-leave-request.dto';
import { HandleLeaveRequestReq } from '../dto/handle-leave-request.dto';
import { LoginReq } from '../dto/login.dto';
import { AuthUser } from '../guard/auth.guard';
import { Role } from '../guard/role.guard';

@Controller()
export class AppController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly getLeaveBalanceUseCase: GetLeaveBalanceUseCase,
    private readonly getLeaveRequestUseCase: GetLeaveRequestUseCase,
    private readonly handleLeaveRequestUseCase: HandleLeaveRequestUseCase,
    private readonly createLeaveRequestUseCase: CreateLeaveRequestUseCase
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginReq,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoginResult> {
    // for simplicity, skip the mapper step from LoginDto to LoginInput
    const result = await this.loginUseCase.execute(dto);

    response.cookie('access_token', result.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: result.expiresIn * 1000,
    });

    return result;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
  }

  @Get('leave-balance')
  @Role(UserRole.Employee)
  leaveBalance(@AuthUser() user: AuthenticatedUser): Promise<GetLeaveBalanceResult> {
    return this.getLeaveBalanceUseCase.execute(user.id);
  }

  @Get('leave-request')
  getLeaveRequest(
    @Query() dto: GetLeaveRequestReq,
    @AuthUser() user: AuthenticatedUser
  ): Promise<GetLeaveRequestResult> {
    return this.getLeaveRequestUseCase.execute({ user, options: dto });
  }

  @Patch('leave-request/:id')
  @Role(UserRole.Manager)
  patchLeaveRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: HandleLeaveRequestReq,
    @AuthUser() user: AuthenticatedUser
  ): Promise<boolean> {
    return this.handleLeaveRequestUseCase.execute({ id, action: dto.action, managerId: user.id });
  }

  @Post('leave-request')
  @Role(UserRole.Employee)
  createLeaveRequest(
    @Body() dto: CreateLeaveRequestReq,
    @AuthUser() user: AuthenticatedUser
  ): Promise<CreateLeaveRequestResult> {
    return this.createLeaveRequestUseCase.execute({
      userId: user.id,
      description: dto.description,
      type: dto.type,
      startDate: dto.startDate,
      leaveDays: dto.leaveDays,
    });
  }
}
