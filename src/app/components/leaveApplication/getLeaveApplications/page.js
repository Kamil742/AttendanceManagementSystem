'use client'
import { use, useEffect, useState } from 'react'
import './leaveApplication.css'
import { email } from '@/app/util/constants'
import Link from 'next/link';

export default function LeaveApplication() {
    const [leaveData, setLeaveData] = useState([]);
    const [showLeaveData, setShowLeaveData] = useState(false);

    const baseurl = `http://localhost:8282/api/leaveApplications`
    const selfLeaveApi = `${baseurl}/fetchLeaveApplications/${email}`
    const approveLeaveApi = `${baseurl}/getLeaveApplications/${email}`

    const getLeaveData = async (apiEndpoint) => {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setLeaveData(data);
    };

    const applicationStatus = async (leaveApplicationId, status) => {
        try {
            const response = await fetch(`${baseurl}/update/${leaveApplicationId}?status=${status}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
            
                getLeaveData(`${approveLeaveApi}` );
            } else {
                console.error('Failed to update data');
            }
        } catch (error) {
            console.error('Error occurred while updating data:', error);
        }
    };

    useEffect(() => {
        getLeaveData(`${selfLeaveApi}`);
    }, []);

    const showLeaveDataHandler = () => {
        setShowLeaveData(true);
        getLeaveData(`${approveLeaveApi}`);
    };

    return (
        <div>
            <div className="addLeave row">
                <div className="col-10">
                    <h3 className="heading">Leave Applications</h3>
                </div>
                <div className="col-1">
                    <button>
                        <Link href="/components/leaveApplication/addLeave">
                            <span className="bi bi-plus-square-fill"></span>
                        </Link>
                    </button>
                </div>
                <div className="col-1">
                    <button onClick={showLeaveDataHandler}>
                        <Link href="">
                            <span className="bi bi-arrow-right-square-fill"></span>
                        </Link>
                    </button>
                </div>
            </div>
            <table className='tableData'>
                <thead>
                    <tr>
                        {showLeaveData && <th>Employee ID</th>}
                        {showLeaveData && <th>Employee Name</th>}
                        <th>Leave Type</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>No of Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                        {showLeaveData && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {leaveData.map((data) => (
                        <tr key={data.leaveApplicationId}>
                            {showLeaveData && <td>{data.employee.employeeId}</td>}
                            {showLeaveData && <td>{data.employee.firstName} {data.employee.lastName}</td>}
                            <td>{data.leavePolicy.leaveType}</td>
                            <td>{data.fromDate}</td>
                            <td>{data.toDate}</td>
                            <td>{data.noOfDays}</td>
                            <td>{data.reason}</td>
                            <td>{data.status}</td>
                            {showLeaveData && (
                                <td>
                                    {data.status === 'PENDING' && (
                                        <>
                                            <button className='btn btn-success' onClick={() => applicationStatus(data.leaveApplicationId, 'approved')}>
                                                <span className='bi bi-check-lg'></span>
                                            </button>
                                            <button className='btn btn-danger' onClick={() => applicationStatus(data.leaveApplicationId, 'declined')}>
                                                <span className='bi bi-x-lg'></span>
                                            </button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
