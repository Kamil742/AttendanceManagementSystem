'use client'
import React, { useState } from 'react';
import './attendance.css'
import { email } from '@/app/util/constants';


const Attendance = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);

  const attendanceApi = async (startDate, endDate) => {
    const response = await fetch(`http://localhost:8282/api/attendance/employee/${email}?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    setAttendanceData(data);
    console.log(attendanceData);
  };

  // Event handler for handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    attendanceApi(startDate, endDate);
    // Perform any additional actions you need with the selected dates
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Input for Start Date */}
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* Input for End Date */}
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Render table if data is available */}
      {attendanceData && Object.keys(attendanceData).length > 0 && (
        <div>
          <h2>Attendance Details</h2>
          <table className='tableData'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-In Time</th>
                <th>Check-In Location</th>
                <th>Check-Out Time</th>
                <th>Check-Out Location</th>
                <th>Total Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendanceData).map(([date, details]) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{details?.checkInTime}</td>
                  <td>{details?.checkInLocation}</td>
                  <td>{details?.checkOutTime}</td>
                  <td>{details?.checkOutLocation}</td>
                  <td>{details?.totalTime}</td>
                  <td>{details?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
