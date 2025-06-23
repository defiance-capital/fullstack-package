import { AllExceptionsFilter } from '@/adapter/filter/all-exception.filter';
import { BusinessExceptionFilter } from '@/adapter/filter/business-exception.filter';
import { HttpExceptionFilter } from '@/adapter/filter/http-exception.filter';
import { AuthGuard } from '@/adapter/guard/auth.guard';
import { ResponseFormatInterceptor } from '@/adapter/interceptor/response.interceptor';
import { CreateLeaveRequestUseCase } from '@/application/usecase/create-leave-request.usecase';
import { GetLeaveBalanceUseCase } from '@/application/usecase/get-leave-balance.usecase';
import { GetLeaveRequestUseCase } from '@/application/usecase/get-leave-request.usecase';
import { HandleLeaveRequestUseCase } from '@/application/usecase/handle-leave-request.usecase';
import { ILeaveBalanceRepository } from '@/domain/repository/leave-balance.repository.interface';
import { ILeaveRequestRepository } from '@/domain/repository/leave-request.repository.interface';
import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from '../adapter/controller/app.controller';
import { LoginUseCase } from '../application/usecase/login.usecase';
import { IUserRepository } from '../domain/repository/user.repository.interface';
import { AuthModule } from './auth/auth.module';
import { TypedConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LeaveBalanceRepository } from './database/repository/leave-balance.repository';
import { LeaveRequestRepository } from './database/repository/leave-request.repository';
import { UserRepository } from './database/repository/user.repository';

@Module({
  imports: [TypedConfigModule, DatabaseModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
          const errorMessages = errors.map((err) => Object.values(err.constraints || {})).flat();
          return new BadRequestException({ message: 'Validation failed', errors: errorMessages });
        },
      }),
    },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: ResponseFormatInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: BusinessExceptionFilter },
    { provide: IUserRepository, useClass: UserRepository },
    { provide: ILeaveBalanceRepository, useClass: LeaveBalanceRepository },
    { provide: ILeaveRequestRepository, useClass: LeaveRequestRepository },
    LoginUseCase,
    GetLeaveBalanceUseCase,
    GetLeaveRequestUseCase,
    HandleLeaveRequestUseCase,
    CreateLeaveRequestUseCase,
  ],
  controllers: [AppController],
})
export class AppModule {}
