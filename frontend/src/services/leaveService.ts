import type { LeaveBalanceResponse, LeaveRequestsResponse } from '../types/api';
import type { LeaveFilters, LeaveRequest, UpdateLeaveRequestParams } from '../types/leave';
import apiClient from './apiClient';

export const getLeaveBalance = async (): Promise<number> => {
  const response = await apiClient.get<LeaveBalanceResponse>('/v1/leave-balance');
  return response.data.data.balance;
};

export const getLeaveRequests = async (params?: LeaveFilters): Promise<LeaveRequest[]> => {
  const response = await apiClient.get<LeaveRequestsResponse<LeaveRequest>>('/v1/leave-request', {
    params,
  });
  return response.data.data.items;
};

export const updateLeaveRequestStatus = async (
  params: UpdateLeaveRequestParams
): Promise<boolean> => {
  await apiClient.patch(`/v1/leave-request/${params.id}`, { action: params.action });
  return true;
};
