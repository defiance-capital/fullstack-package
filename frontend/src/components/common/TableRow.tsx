import React from 'react';
import { LeaveStatus } from '../../constants/leaveStatus';
import type { LeaveRequest } from '../../types/leave';

interface TableRowProps {
  request: LeaveRequest;
  children?: React.ReactNode; // For action buttons or extra cells
}

const TableRow: React.FC<TableRowProps> = ({ request, children }) => {
  return (
    <tr>
      <td>{request.type}</td>
      <td>{request.startDate}</td>
      <td>{request.leaveDays}</td>
      <td>{request.description}</td>
      <td>
        <span
          className={`badge bg-${
            request.status === LeaveStatus.APPROVED
              ? 'success'
              : request.status === LeaveStatus.REJECTED
              ? 'danger'
              : 'warning'
          }`}
        >
          {request.status}
        </span>
      </td>
      {children}
    </tr>
  );
};

export default TableRow;
