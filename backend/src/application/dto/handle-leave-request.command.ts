export enum HandleLeaveRequestAction {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export class HandleLeaveRequestCommand {
  id: number;
  action: HandleLeaveRequestAction;
  managerId: number;
}
