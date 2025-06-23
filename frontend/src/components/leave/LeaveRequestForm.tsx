import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import FormGroup from '../common/FormGroup';
import { LeaveType } from '../../constants/leaveType';

const LeaveRequestForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [leaveDays, setLeaveDays] = useState('1');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<LeaveType>(LeaveType.ANNUAL);
  const [error, setError] = useState('');

  const handleLeaveDaysChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = (e.target as HTMLInputElement).value;
    // Allow empty string, numbers, and a single decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setLeaveDays(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const numLeaveDays = parseFloat(leaveDays);

    if (isNaN(numLeaveDays) || numLeaveDays <= 0 || numLeaveDays % 0.5 !== 0) {
      setError('Leave days must be a positive number in increments of 0.5 (e.g., 0.5, 1, 1.5).');
      return;
    }

    if (!startDate || !description) {
      alert('Please fill out all fields.');
      return;
    }
    // const formattedStartDate = startDate.toISOString().split('T')[0];

    setStartDate(new Date());
    setLeaveDays('1');
    setDescription('');
    setType(LeaveType.ANNUAL);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Submit Leave Request</h5>
        <form onSubmit={handleSubmit}>
          <FormGroup label="Leave Type" id="leaveType">
            <select
              id="leaveType"
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value as LeaveType)}
            >
              {Object.values(LeaveType).map((leaveType) => (
                <option key={leaveType} value={leaveType}>
                  {leaveType}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup label="Start Date" id="startDate">
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              required
            />
          </FormGroup>

          <FormGroup
            label="Leave Days (in increments of 0.5)"
            type="text"
            id="leaveDays"
            value={leaveDays}
            onChange={handleLeaveDaysChange}
            required
          />

          {error && <div className="alert alert-danger p-2 mt-2">{error}</div>}

          <FormGroup
            label="Description"
            type="textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
