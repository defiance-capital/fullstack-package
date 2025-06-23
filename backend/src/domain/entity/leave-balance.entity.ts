export class LeaveBalanceEntity {
  constructor(
    public id: number,
    public userId: number,
    public balance: number = 12,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
