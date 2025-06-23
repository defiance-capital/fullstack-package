import { LeaveBalanceEntity } from '@/domain/entity/leave-balance.entity';
import { LeaveRequestEntity } from '@/domain/entity/leave-request.entity';
import { UserEntity, UserRole } from '@/domain/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(private readonly manager: EntityManager) {}

  async run() {
    const userRepo = this.manager.getRepository(UserEntity);
    const leaveRequestRepo = this.manager.getRepository(LeaveRequestEntity);
    const leaveBalanceRepo = this.manager.getRepository(LeaveBalanceEntity);

    await userRepo.clear();
    await leaveRequestRepo.clear();
    await leaveBalanceRepo.clear();

    await userRepo
      .createQueryBuilder()
      .insert()
      .values([
        { id: 1, username: 'employee1', name: 'Nhân viên 1' },
        { id: 2, username: 'employee2', name: 'Nhân viên 2' },
        { id: 3, username: 'manager1', name: 'Quản lý 1', role: UserRole.Manager },
        { id: 4, username: 'manager2', name: 'Quản lý 2', role: UserRole.Manager },
      ])
      .updateEntity(false)
      .execute();

    await leaveRequestRepo
      .createQueryBuilder()
      .insert()
      .values([
        {
          creatorId: 1,
          leaveDays: 1,
          startDate: new Date('2025-03-01'),
          endDate: new Date('2025-03-01'),
        },
        {
          creatorId: 1,
          leaveDays: 2,
          startDate: new Date('2025-03-05'),
          endDate: new Date('2025-03-06'),
        },
        {
          creatorId: 2,
          leaveDays: 2,
          startDate: new Date('2025-04-05'),
          endDate: new Date('2025-04-06'),
        },
        {
          creatorId: 2,
          leaveDays: 2,
          startDate: new Date('2025-04-05'),
          endDate: new Date('2025-04-06'),
        },
      ])
      .updateEntity(false)
      .execute();

    await leaveBalanceRepo
      .createQueryBuilder()
      .insert()
      .values([{ userId: 1 }, { userId: 2 }])
      .updateEntity(false)
      .execute();
  }
}
