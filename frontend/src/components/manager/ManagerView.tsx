import React from 'react';
import { ActionType } from '../../constants/actionType';
import { LeaveStatus } from '../../constants/leaveStatus';
import { useLeaveContext } from '../../contexts/LeaveContext';
import LeaveFilterBar from '../common/LeaveFilterBar';
import TableRow from '../common/TableRow';

const ManagerView: React.FC = () => {
  const { leaveRequests, loading, error, updateStatus } = useLeaveContext();
  const [handleLoading, setHandleLoading] = React.useState(false);

  const handleAction = async (id: number, action: ActionType) => {
    setHandleLoading(true);
    try {
      await updateStatus(id, action);
    } finally {
      setHandleLoading(false);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error loading requests.</p>;
  if (!leaveRequests) return null;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">All Leave Requests</h5>
        <LeaveFilterBar />
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Start Date</th>
              <th>Leave Days</th>
              <th>Description</th>
              <th>Status</th>
              <th>Employee ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <TableRow key={request.id} request={request}>
                <td>{request.creatorId}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(request.id, ActionType.APPROVE)}
                    disabled={request.status !== LeaveStatus.PENDING || handleLoading}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction(request.id, ActionType.REJECT)}
                    disabled={request.status !== LeaveStatus.PENDING || handleLoading}
                  >
                    Reject
                  </button>
                </td>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerView;
