import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LeaveStatus } from '../../constants/leaveStatus';
import { useLeaveContext } from '../../contexts/LeaveContext';
import { normalizeDate } from '../../utils/date';

const sortOptions = [
  { value: 'startDate-DESC', label: 'Start Date ↓' },
  { value: 'startDate-ASC', label: 'Start Date ↑' },
  { value: 'status-ASC', label: 'Status A-Z' },
  { value: 'status-DESC', label: 'Status Z-A' },
];

const LeaveFilterBar: React.FC = () => {
  const { setFilters } = useLeaveContext();
  const [status, setStatus] = useState('ALL');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState('startDate-DESC');

  const handleSearch = () => {
    const [sortField, sortDir] = sortBy.split('-');
    setFilters({
      status: status === 'ALL' ? undefined : (status as LeaveStatus),
      startDate: normalizeDate(fromDate),
      endDate: normalizeDate(toDate),
      sortBy: sortField as 'status' | 'startDate',
      sortDir: sortDir as 'ASC' | 'DESC',
    });
  };

  return (
    <div className="mb-3 d-flex flex-wrap align-items-end gap-2">
      <div>
        <label htmlFor="statusFilter" className="form-label me-2">
          Status:
        </label>
        <select
          id="statusFilter"
          className="form-select d-inline-block w-auto"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ALL">All</option>
          {Object.values(LeaveStatus).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="form-label me-2">From:</label>
        <DatePicker
          selected={fromDate}
          onChange={setFromDate}
          dateFormat="yyyy-MM-dd"
          className="form-control d-inline-block w-auto"
          isClearable
          placeholderText="Start date"
        />
      </div>
      <div>
        <label className="form-label me-2">To:</label>
        <DatePicker
          selected={toDate}
          onChange={setToDate}
          dateFormat="yyyy-MM-dd"
          className="form-control d-inline-block w-auto"
          isClearable
          placeholderText="End date"
        />
      </div>
      <div>
        <label htmlFor="sortBy" className="form-label me-2">
          Sort by:
        </label>
        <select
          id="sortBy"
          className="form-select d-inline-block w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleSearch} type="button">
        Search
      </button>
    </div>
  );
};

export default LeaveFilterBar;
