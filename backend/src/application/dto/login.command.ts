import { AuthenticatedUser } from '../port/auth.user.interface';

export class LoginCommand {
  username: string;
}

export class LoginResult {
  accessToken: string;
  expiresIn: number = 86400; // seconds
  user: AuthenticatedUser;
}
