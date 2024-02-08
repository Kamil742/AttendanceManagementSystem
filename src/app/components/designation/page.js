'use client'
import { useState, useEffect } from "react";
import './designation.css';
import { useRouter } from "next/navigation";

export default function AddDesignation() {
    const router = useRouter();

    const [designation, setDesignation] = useState({
        designationName: '',
        department: {
            departmentId: '' // Nested departmentId inside department object
        }
    });

    const [departments, setDepartments] = useState([]);

    const { designationName, department } = designation;

    const onInputChange = (e) => {
        // Check if the input belongs to the department
        if (e.target.name.startsWith('department')) {
            setDesignation({
                ...designation,
                department: {
                    ...department,
                    [e.target.name.split('.')[1]]: e.target.value
                }
            });
        } else {
            setDesignation({
                ...designation,
                [e.target.name]: e.target.value
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8282/api/designations/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(designation),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData);
                router.push('/components/profile');
            } else {
                console.error('Failed to submit form. Server returned:', response.status, response.statusText);
                const errorResponseData = await response.json();
                console.error('Error Response Body:', errorResponseData);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        console.log(designation);
    };

    const getDepartments = async () => {
        try {
            const response = await fetch('http://localhost:8282/api/departments/getDepartments');
            if (response.ok) {
                const data = await response.json();
                setDepartments(data);
                console.log(data);
            } else {
                console.error('Failed to fetch departments. Server returned:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    useEffect(() => {
        getDepartments();
    }, []);

    return (
        <div>
            <div className='container'>
                <div className='row row1'>
                    <div className='col-md-6 offset-md-3 border boxi rounded p-4 mt-2'>
                        <h2 className='text-center title'>Create Designation</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='mb-3'>
                                <label htmlFor='designationName' className='form-label'>Designation Name</label>
                                <input type='text' className='form-control' name='designationName' value={designationName}
                                    onChange={(e) => onInputChange(e)} placeholder='Enter Designation Name' required />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='department.departmentId' className='form-label'>Department</label>
                                <select
                                    className='form-select'
                                    name='department.departmentId'
                                    value={department.departmentId}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                >
                                    <option value=''>Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department.departmentId} value={department.departmentId}>
                                            {department.departmentName}
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
