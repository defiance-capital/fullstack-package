import React, { createContext, useCallback, useContext, useState } from 'react';
import { ActionType } from '../constants/actionType';
import { LeaveStatus } from '../constants/leaveStatus';
import { useFetch } from '../hooks/useFetch';
import { useMutation } from '../hooks/useMutation';
import { getLeaveRequests, updateLeaveRequestStatus } from '../services/leaveService';
import type { LeaveFilters, LeaveRequest } from '../types/leave';

interface LeaveContextType {
  leaveRequests: LeaveRequest[] | null;
  loading: boolean;
  error: unknown;
  updateStatus: (id: number, action: ActionType) => Promise<void>;
  filters: LeaveFilters;
  setFilters: (filters: LeaveFilters) => void;
  refetch: () => void;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const LeaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<LeaveFilters>({ sortBy: 'startDate', sortDir: 'DESC' });
  const fetcher = useCallback(() => {
    return getLeaveRequests({
      status: filters.status as LeaveStatus | undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      sortBy: filters.sortBy || 'startDate',
      sortDir: filters.sortDir || 'DESC',
    });
  }, [filters]);
  const { data: leaveRequests, loading, error, refetch } = useFetch(fetcher);
  const { mutate: mutateStatus } = useMutation(updateLeaveRequestStatus);

  const updateStatus = async (id: number, action: ActionType) => {
    await mutateStatus({ id, action });
    refetch();
  };

  return (
    <LeaveContext.Provider
      value={{ leaveRequests, loading, error, updateStatus, filters, setFilters, refetch }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLeaveContext = () => {
  const ctx = useContext(LeaveContext);
  if (!ctx) throw new Error('useLeaveContext must be used within a LeaveProvider');
  return ctx;
};
