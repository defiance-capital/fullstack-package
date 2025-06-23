import {
  LeaveRequestEntity,
  LeaveRequestStatus,
  LeaveRequestType,
} from '@/domain/entity/leave-request.entity';
import { EntitySchema } from 'typeorm';

export const LeaveRequestSchema = new EntitySchema<LeaveRequestEntity>({
  name: 'LeaveRequestEntity',
  tableName: 'leave_requests',
  target: LeaveRequestEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
      unsigned: true,
    },
    description: {
      type: 'text',
      nullable: true,
    },
    type: {
      type: 'enum',
      enum: LeaveRequestType,
      default: LeaveRequestType.ANNUAL,
    },
    status: {
      type: 'enum',
      enum: LeaveRequestStatus,
      default: LeaveRequestStatus.PENDING,
    },
    startDate: {
      name: 'start_date',
      type: 'date',
    },
    endDate: {
      name: 'end_date',
      type: 'date',
    },
    leaveDays: {
      name: 'leave_days',
      type: 'tinyint',
      unsigned: true,
    },
    creatorId: {
      name: 'creator_id',
      type: Number,
      unsigned: true,
    },
    approverId: {
      name: 'approver_id',
      type: Number,
      unsigned: true,
      nullable: true,
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
