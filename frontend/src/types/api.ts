import type { ErrorCode } from '../constants/errorCode';

export interface ApiErrorResponse {
  errorCode: ErrorCode;
  message: string;
}

export interface LeaveBalanceResponse {
  data: {
    balance: number;
  };
}

export interface LeaveRequestsResponse<T> {
  data: {
    items: T[];
  };
}
