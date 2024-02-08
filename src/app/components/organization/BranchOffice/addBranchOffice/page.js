'use client'
import { useState, useEffect } from "react";
import './addBranchOffice.css';
import { useRouter } from "next/navigation";

export default function AddBranchOffice() {
    const router = useRouter();

    const [branchOffice, setBranchOffice] = useState({
        locationName: '',
        locationDetails:'',
        checkInTime:'',
        checkOutTime:'',
        organization: {
            organizationId: ''
        }
    });

    const [organizations, setOrganizations] = useState([]);

    const { locationName, locationDetails, checkInTime, checkOutTime, organization } = branchOffice;

    const onInputChange = (e) => {
        // Check if the input belongs to the department
        if (e.target.name.startsWith('organization')) {
            setBranchOffice({
                ...branchOffice,
                organization: {
                    ...organization,
                    [e.target.name.split('.')[1]]: e.target.value
                }
            });
        } else {
            setBranchOffice({
                ...branchOffice,
                [e.target.name]: e.target.value
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8282/api/locations/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(branchOffice),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData);
                router.push('/components/organization/BranchOffice/viewBranchOffice');
            } else {
                console.error('Failed to submit form. Server returned:', response.status, response.statusText);
                const errorResponseData = await response.json();
                console.error('Error Response Body:', errorResponseData);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        console.log(branchOffice);
    };

    const getOrganizations = async () => {
        try {
            const response = await fetch('http://localhost:8282/api/organization/getOrganizations');
            if (response.ok) {
                const data = await response.json();
                setOrganizations(data);
                console.log(data);
            } else {
                console.error('Failed to fetch organizations. Server returned:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching organizations:', error);
        }
    };

    useEffect(() => {
        getOrganizations();
    }, []);

    return (
        <div>
            <div className='container'>
                <div className='row row1'>
                    <div className='col-md-6 offset-md-3 border boxi rounded p-4 mt-2'>
                        <h2 className='text-center title'>Create Branch Office</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='mb-3'>
                                <label htmlFor='locationDetails' className='form-label'>Office Address</label>
                                <input type='text' className='form-control' name='locationDetails' value={locationDetails}
                                    onChange={(e) => onInputChange(e)} placeholder='Enter Office Address' required />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='locationName' className='form-label'>Location Name</label>
                                <input type='text' className='form-control' name='locationName' value={locationName}
                                    onChange={(e) => onInputChange(e)} placeholder='Enter Location Name (City)' required />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="checkInTime" className='form-label'>Check-In Time:</label>
                                <input type="time" className='form-control' name="checkInTime" value={checkInTime}
                                 onChange={(e) => onInputChange(e)} placeholder='Enter Check In Time' required/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="checkOutTime" className='form-label'>Check-Out Time:</label>
                                <input type="time" className='form-control' name="checkOutTime" value={checkOutTime}
                                 onChange={(e) => onInputChange(e)} placeholder='Enter Check Out Time' required/>
                                
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='organization.organizationId' className='form-label'>Organization</label>
                                <select
                                    className='form-select'
                                    name='organization.organizationId'
                                    value={organization.organizationId}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                >
                                    <option value=''>Select Organization</option>
                                    {organizations.map((organization) => (
                                        <option key={organization.organizationId} value={organization.organizationId}>
                                            {organization.organizationName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="button">
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
