import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getLeaveBalance } from '../../services/leaveService';

const LeaveBalance: React.FC = () => {
  const { data: leaveBalance, loading } = useFetch(getLeaveBalance);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Leave Balance</h5>
        <p className="card-text">
          {loading ? (
            'Loading balance...'
          ) : (
            <>You have {leaveBalance ?? 0} days of leave remaining.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default LeaveBalance;
