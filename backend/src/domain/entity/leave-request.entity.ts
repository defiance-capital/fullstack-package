export enum LeaveRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum LeaveRequestType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  UNPAID = 'UNPAID',
}

export class LeaveRequestEntity {
  id: number;
  description: string;
  type: LeaveRequestType;
  status: LeaveRequestStatus;
  startDate: Date;
  endDate: Date;
  leaveDays: number;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
  approverId: number | null = null;

  constructor(props: Partial<LeaveRequestEntity>) {
    Object.assign(this, props);

    if (this.startDate) {
      this.startDate.setHours(0, 0, 0, 0); // Normalize start date to midnight
      if (this.leaveDays > 0 && !this.endDate) {
        this.endDate = new Date(this.startDate);
        this.endDate.setDate(this.startDate.getDate() + Math.ceil(this.leaveDays) - 1);
      }
    }
  }
}
