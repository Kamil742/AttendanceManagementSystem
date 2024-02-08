'use client'
import { useState } from "react"
import './addHoliday.css'
import { useRouter } from "next/navigation";



export default function AddHoliday() {

    const router = useRouter();

    const [holiDay, setHoliDay] = useState({
        holidayDate: '',
        holidayName: '',
        holidayType: ''
    })

    const today = new Date().toISOString().split('T')[0];

    const { holidayDate, holidayName, holidayType } = holiDay

    const onInputChange = (e) => {
        setHoliDay({ ...holiDay, [e.target.name]: e.target.value })
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        try {
                  const response = await fetch('http://localhost:8282/api/holidays/add', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(holiDay),
                  });
            
                  if (response.ok) {
                    const responseData = await response.json();
                    console.log('API Response:', responseData);
                    router.push('/components/holiday/viewHoliday'); 
                  } else {
                    console.error('Failed to submit form. Server returned:', response.status, response.statusText);
                    const errorResponseData = await response.json();
                    console.error('Error Response Body:', errorResponseData);
                  }
                } catch (error) {
                  console.error('Error submitting form:', error);
                }

                console.log(holiDay);
        // navigate('/') 
       }

    return (
        <div>
            <div className='container'>
                <div className='row row1'>
                    <div className='col-md-6 offset-md-3 border boxi rounded p-4 mt-2'>
                        <h2 className='text-center title'>Add Holiday</h2>
                        <form onSubmit={(e)=>onSubmit(e)}>


                        <div className='mb-3'>
                            <label htmlFor='holidayDate' className='form-label'>Date</label>
                            <input type='date' className='form-control' name='holidayDate' value={holidayDate} min={today}
                                onChange={(e) => onInputChange(e)} placeholder='Enter date' pattern="\d{4}-\d{2}-\d{2}" required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='holidayName' className='form-label'>Holiday Name</label>
                            <input type='text' className='form-control' name='holidayName' value={holidayName}
                                onChange={(e) => onInputChange(e)} placeholder='Enter Holiday Name' required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='holidayType' className='form-label'>Holiday Type </label>:
                            <select name="holidayType" id="holidayType" required value={holidayType} onChange={(e) => onInputChange(e)}>
                                <option>SELECT</option>
                                <option value="MANDATORY">MANDATORY</option>
                                <option value="OPTIONAL">OPTIONAL</option>
                            </select>

                        </div>

                        <div className="button1"><button type='submit' className=''>Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}