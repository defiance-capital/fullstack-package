import { LeaveBalanceEntity } from '@/domain/entity/leave-balance.entity';
import { EntitySchema } from 'typeorm';

export const LeaveBalanceSchema = new EntitySchema<LeaveBalanceEntity>({
  name: 'LeaveBalanceEntity',
  tableName: 'leave_balances',
  target: LeaveBalanceEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      unsigned: true,
    },
    userId: {
      name: 'user_id',
      type: Number,
      unsigned: true,
    },
    balance: {
      name: 'balance',
      type: 'tinyint',
      unsigned: true,
      default: 12,
    },
    createdAt: {
      name: 'created_at',
      type: Date,
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      name: 'updated_at',
      type: Date,
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
});
