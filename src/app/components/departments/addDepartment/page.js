

'use client'
import { useState } from "react"
import './addDepartment.css'
import { useRouter } from "next/navigation";



export default function AddDepartment() {

    const router = useRouter();

    const [department, setDepartment] = useState({
        departmentName:''
    })


    const { departmentName } = department

    const onInputChange = (e) => {
        setDepartment({ ...department, [e.target.name]: e.target.value })
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        try {
                  const response = await fetch('http://localhost:8282/api/departments/add', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(department),
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

                console.log(department);
        // navigate('/') 
       }

    return (
        <div>
            <div className='container'>
                <div className='row row1'>
                    <div className='col-md-6 offset-md-3 border boxi rounded p-4 mt-2'>
                        <h2 className='text-center title'>Create Department</h2>
                        <form onSubmit={(e)=>onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='departmentName' className='form-label'>Department Name</label>
                            <input type='text' className='form-control' name='departmentName' value={departmentName}
                                onChange={(e) => onInputChange(e)} placeholder='Enter Department Name' required />
                        </div>


                        <div className="button"><button type='submit' className=''>Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}