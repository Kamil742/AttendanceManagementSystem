'use client'
import { useState, useEffect } from "react";
import './addLeave.css';
import { useRouter } from "next/navigation";
import { email } from '@/app/util/constants'

export default function AddDesignation() {
    const router = useRouter();

    const [leaveApplication, setLeaveApplication] = useState({
        fromDate: '',
        toDate: '',
        teamEmailId: '',
        reason: '',
        leavePolicy: {
            leavePolicyId: ''
        }
    });

    const [leavePolicies, setLeavePolicies] = useState([]);

    const { fromDate, toDate, teamEmailId, reason, leavePolicy } = leaveApplication;

    const onInputChange = (e) => {
        if (e.target.name.startsWith('leavePolicy')) {
            setLeaveApplication({
                ...leaveApplication,
                leavePolicy: {
                    ...leavePolicy,
                    [e.target.name.split('.')[1]]: e.target.value
                }
            });
        } else {
            setLeaveApplication({
                ...leaveApplication,
                [e.target.name]: e.target.value
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8282/api/leaveApplications/add/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leaveApplication),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData);
                router.push('/components/leaveApplication/getLeaveApplications');
            } else {
                console.error('Failed to submit form. Server returned:', response.status, response.statusText);
                const errorResponseData = await response.json();
                console.error('Error Response Body:', errorResponseData);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        console.log(leaveApplication);
    };

    const getPolicies = async () => {
        try {
            const response = await fetch('http://localhost:8282/api/leavePolicies/getLeavePolicies');
            if (response.ok) {
                const data = await response.json();
                setLeavePolicies(data);
                console.log(data);
            } else {
                console.error('Failed to fetch leave Policies. Server returned:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching leave policies:', error);
        }
    };

    useEffect(() => {
        getPolicies();
    }, []);

    return (
        <div>
            <div className='container'>
                <div className='row row1'>
                    <div className='col-md-6 offset-md-3 border boxi rounded p-4 mt-2'>
                        <h2 className='text-center title'>Apply for Leave</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                                <div className='mb-3'>
                                <label htmlFor='fromDate' className='form-label'>From Date</label>
                                <input type='date' className='form-control' name='fromDate' value={fromDate}
                                onChange={(e) => onInputChange(e)} min={new Date().toISOString().split('T')[0]} required/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='toDate' className='form-label'> To Date </label>
                                <input type='date' className='form-control' name='toDate' value={toDate}
                                onChange={(e) => onInputChange(e)} min={fromDate} required/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='teamEmailId' className='form-label'> Team Email Id </label>
                                <input type='text' className='form-control' name='teamEmailId' value={teamEmailId}
                                onChange={(e) => onInputChange(e)} placeholder='Enter Team Email Id'/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='reason' className='form-label'>Reason</label>
                                <input type='text' className='form-control' name='reason' value={reason}
                                onChange={(e) => onInputChange(e)} placeholder='Enter Reason' required/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='leavePolicy.leavePolicyId' className='form-label'>
                                Leave Type
                                </label>
                                <select
                                className='form-select'
                                name='leavePolicy.leavePolicyId'
                                value={leavePolicy.leavePolicyId}
                                onChange={(e) => onInputChange(e)}
                                required
                                >
                                <option value=''>Select Leave Type</option>
                                {leavePolicies.map((leave) => (
                                    <option key={leave.leavePolicyId} value={leave.leavePolicyId}>
                                    {leave.leaveType}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div className="button1">
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
