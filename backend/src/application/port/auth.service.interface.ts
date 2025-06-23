export interface IAuthService {
  sign(
    payload: object,
    options?: Record<string, unknown>
  ): Promise<{ accessToken: string; expiresIn: number }>;

  verify<T extends object>(token: string, options?: Record<string, unknown>): Promise<T>;
}

export abstract class IAuthService {}
