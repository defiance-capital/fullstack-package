import { UserEntity, UserRole } from '@/domain/entity/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'UserEntity',
  tableName: 'users',
  target: UserEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      unsigned: true,
    },
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    role: {
      type: 'enum',
      enum: UserRole,
    },
    created_at: {
      type: Date,

      default: () => 'CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: Date,

      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
});
