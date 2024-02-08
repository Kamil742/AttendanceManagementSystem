'use client'
import { useState } from "react"
import { useEffect } from "react"
import './leave.css'
import { email } from '@/app/util/constants';




export default function Leave(){

    const [leave,setLeave] = useState([])

    const leaveApi = async()=>{
        const response = await fetch(`http://localhost:8282/api/leaveApplications/fetch/${email}`)
        const data = await response.json()
        setLeave(data)
        console.log(data);
    }

    useEffect(()=>{
       leaveApi()
    },[])

    return(
        <div>
            <div className="leaveCard">
                {
                    leave.map((item)=>(
                        <div className="card">
                            <h5>{item.leaveType}</h5><br />
                            <p>Available : {item.availableLeave}</p><br />
                            <p>Taken/Booked : {item.leaveTaken}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}