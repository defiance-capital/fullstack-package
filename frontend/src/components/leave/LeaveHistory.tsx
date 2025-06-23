import React from 'react';
import { useLeaveContext } from '../../contexts/LeaveContext';
import TableRow from '../common/TableRow';
import LeaveFilterBar from '../common/LeaveFilterBar';

const LeaveHistory: React.FC = () => {
  const { leaveRequests, loading, error } = useLeaveContext();

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Previous Leave Requests</h5>
        <LeaveFilterBar />
        {loading ? (
          <div>Loading leave history...</div>
        ) : error ? (
          <div>Error loading leave history.</div>
        ) : !leaveRequests ? null : (
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Start Date</th>
                <th>Leave Days</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(leaveRequests) &&
                leaveRequests.map((request) => <TableRow key={request.id} request={request} />)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaveHistory;
