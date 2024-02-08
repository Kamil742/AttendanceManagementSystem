'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './holiday.css';
import { useRouter } from 'next/router';

export default function Holiday() {
  const [holiday, setHoliday] = useState([]);
  const [deleteIconsVisible, setDeleteIconsVisible] = useState(false);
  const router = useRouter;

  const holidayApi = async () => {
    const response = await fetch('http://localhost:8282/api/holidays/getHolidayCalenders');
    const data = await response.json();
    setHoliday(data);
    console.log(data);
  };

  useEffect(() => {
    holidayApi();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this holiday?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8282/api/holidays/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
        //   setHoliday((prevHoliday) => prevHoliday.filter((item) => item.id !== id));
        holidayApi()
          router.push('/components/holiday/viewHoliday');
        } else {
          console.error('Failed to delete holiday:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error deleting holiday:', error);
      }
    }
  };

  const renderActions = (id, holidayDate) => {
    const currentDate = new Date();
    const showDelete = deleteIconsVisible && currentDate < new Date(holidayDate);

    return (
      <div>
        {showDelete && (
          <button onClick={() => handleDelete(id)} className="btn btn-danger">
            <span className="bi bi-x-lg"></span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="addholiday row">
        <div className="col-10">
          <h3 className="heading">Calendar Year Holidays</h3>
        </div>
        <div className="col-1">
          <button onClick={() => setDeleteIconsVisible((prev) => !prev)}>
            <span className="bi bi-pencil-square"></span>
          </button>
        </div>
        <div className="col-1">
          <button>
            <Link href="/components/holiday/addHoliday">
              <span className="bi bi-plus-square-fill"></span>
            </Link>
          </button>
        </div>
      </div>
      <table className="tableData">
        <thead>
          <tr>
            <td>Date</td>
            <td>Name</td>
            <td>Type</td>
            {deleteIconsVisible? <td>Actions</td>:<td></td>}
          </tr>
        </thead>
        <tbody>
          {holiday.map((item) => (
            <tr key={item.holidayId}>
              <td>{item.holidayDate}</td>
              <td>{item.holidayName}</td>
              <td>{item.holidayType}</td>
              <td>{renderActions(item.holidayId, item.holidayDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
