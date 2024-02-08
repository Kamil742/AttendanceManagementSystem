

'use client'
import { useState } from "react"
import './organization.css'
import { useRouter } from "next/navigation";



export default function AddOrganization() {

    const router = useRouter();

    const [organization, setOrganization] = useState({
        organizationName:'',
        headOfficeLocation:'',
        headOfficeAddress:''
    })


    const { organizationName, headOfficeLocation, headOfficeAddress } = organization

    const onInputChange = (e) => {
        setOrganization({ ...organization, [e.target.name]: e.target.value })
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        try {
                  const response = await fetch('http://localhost:8282/api/organization/add', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(organization),
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

                console.log(organization);
        // navigate('/') 
       }

    return (
        <div>
            <div className='container'>
                <div className='row row1'>
                    <div className='col-md-6 offset-md-3 border boxi rounded p-4 mt-2'>
                        <h2 className='text-center title'>Create Organization</h2>
                        <form onSubmit={(e)=>onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='organizationName' className='form-label'>Organization Name</label>
                            <input type='text' className='form-control' name='organizationName' value={organizationName}
                                onChange={(e) => onInputChange(e)} placeholder='Enter Organization Name' required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='headOfficeLocation' className='form-label'>Head Office Location</label>
                            <input type='text' className='form-control' name='headOfficeLocation' value={headOfficeLocation}
                                onChange={(e) => onInputChange(e)} placeholder='Enter Head Office Location' required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='headOfficeAddress' className='form-label'>Head Office Address</label>
                            <input type='text' className='form-control' name='headOfficeAddress' value={headOfficeAddress}
                                onChange={(e) => onInputChange(e)} placeholder='Enter Head Office Address' required />
                        </div>
                        <div className="button"><button type='submit' className=''>Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}