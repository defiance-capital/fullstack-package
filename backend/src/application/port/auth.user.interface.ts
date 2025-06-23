import { UserRole } from '@/domain/entity/user.entity';

export interface AuthenticatedUser {
  id: number;
  username: string;
  name: string;
  role: UserRole;
}
