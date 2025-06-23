import { Role } from '../constants/role';

export interface User {
  id: number;
  username: string;
  name: string;
  role: Role;
}
