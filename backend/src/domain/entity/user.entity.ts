export enum UserRole {
  Employee = 'employee',
  Manager = 'manager',
}

export class UserEntity {
  constructor(
    public id: number,
    public username: string,
    public name: string,
    public role: UserRole,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
