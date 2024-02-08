// 'use client'
// import './profile.css'
// import { use, useEffect, useState } from 'react'
// import { email } from '@/app/util/constants';



// export default function profile() {
//     // const {id} = useParams()

//     const [user, setUser] = useState([])
//     const [userAddress, setUserAddress] = useState([])
//     const [userDesignation, setUserDesignation] = useState([])
//     const [userDepartment, setUserDepartment] = useState([])
//     const [userLocation, setUserLocation] = useState([])
//     const [organization, setOrganization] = useState([])

//     const addEmployee = async () => {
//         const response = await fetch(`http://localhost:8282/api/employees/getEmployee/${email}`)
//         const data = await response.json()
//         setUser(data)
//         setUserAddress(data.address)
//         setUserDesignation(data.designation)
//         setUserDepartment(data.designation.department)
//         setUserLocation(data.location)
//         setOrganization(data.location.organization)

//         console.log(data);
//     }

//     useEffect(() => {
//         addEmployee()
//     }, [])


//     return (
//         <div>
//             <div className='mainpage'>
//                 <div className='cards'>
//                     <h3>About Me</h3>
//                     <ul>
//                         <li><span className='bi bi-diagram-3-fill icon-text'></span>{userDepartment.departmentName}</li>
//                         <li><span className='bi bi-person-circle icon-text'></span>{userDesignation.designationName}</li>
//                         <li><span className='bi bi-reception-4 icon-text'></span> {user.phone}</li>
//                         <li><span className='bi bi-geo-alt-fill icon-text'></span> Bangalore</li>
//                         <li><span className='bi bi-calendar-plus icon-text'></span> General</li>
//                         <li><span className='bi bi-clock-history icon-text'></span> (GMT+05:30)</li>
//                     </ul>

//                 </div>
//                 <div className='cards'>
//                     <h3>Organisation Structure</h3>
//                     <ul>
//                         <li><span className='bi bi-gear-wide-connected icon-text'></span> {userDepartment.departmentName}</li>
//                         <li><span className='bi bi-diagram-3-fill icon-text'></span> {userDesignation.designationName}</li>
//                     </ul>

//                 </div>
//                 <div className='cards'>
//                     <h3>SkillSet</h3>
//                     <ul>
//                         <li><span className='bi bi-gear-wide-connected icon-text'></span> Department</li>
//                         <li><span className='bi bi-diagram-3-fill icon-text'></span> internship/Trainee</li>
//                     </ul>

//                 </div>
//                 <div className='cards'>
//                     <h3>Basic Details</h3>
//                     <div>
//                         <div className='basicdetails'>
//                             <div className='col-6'>Employee Name</div>
//                             <div className='col-6'>{user.firstName} {user.lastName}</div>
//                         </div>
//                         <div className='basicdetails'>
//                             <div className='col-6'>Department</div>
//                             { <div className='col-6'>{userDepartment.departmentName }</div> }
//                         </div>
//                         <div className='basicdetails'>
//                             <div className='col-6'>Employee ID : </div>
//                             <div className='col-6'>{user.employeeId}</div>
//                         </div>
//                         <div className='basicdetails'>
//                             <div className='col-6'>Reporting To</div>
//                             <div className='col-6'>{user.reportingManager}</div>
//                         </div>
//                         <div className='basicdetails'>
//                             <div className='col-6'>Email :</div>
//                             <div className='col-6'>{user.emailId}</div>
//                         </div>
//                         <div className='basicdetails'>
//                             <div className='col-6'>Age :</div>
//                             <div className='col-6'>{user.age}</div>
//                         </div>
//                         <div className='basicdetails'>
//                             <div className='col-6'>Gender :</div>
//                             <div className='col-6'>{user.gender}</div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }


'use client'
import './profile.css'
import { use, useEffect, useState } from 'react'
import { email } from '@/app/util/constants';
import TimerLocation from '@/app/dashboard/page';



export default function profile() {
    // const {id} = useParams()

    const [user, setUser] = useState([])
    const [userAddress, setUserAddress] = useState([])
    const [userDesignation, setUserDesignation] = useState([])
    const [userDepartment, setUserDepartment] = useState([])
    const [userLocation, setUserLocation] = useState([])
    const [organization, setOrganization] = useState([])

    const addEmployee = async () => {
        const response = await fetch(`http://localhost:8282/api/employees/getEmployee/${email}`)
        const data = await response.json()
        setUser(data)
        setUserAddress(data.address)
        setUserDesignation(data.designation)
        setUserDepartment(data.designation.department)
        setUserLocation(data.location)
        setOrganization(data.location.organization)

        console.log(data);
    }

    useEffect(() => {
        addEmployee()
    }, [])


    return (
        <div>
            <div className='row dashboardPage'>
                <div className='col-6 left-side-page'>
                    <div className='cards'>
                        <h3>About Me</h3>
                        <ul>
                            <li><span className='bi bi-diagram-3-fill icon-text'></span>{userDepartment.departmentName}</li>
                            <li><span className='bi bi-person-circle icon-text'></span>{userDesignation.designationName}</li>
                            <li><span className='bi bi-reception-4 icon-text'></span> {user.phone}</li>
                            <li><span className='bi bi-geo-alt-fill icon-text'></span> {userLocation.locationName}</li>
                            <li><span className='bi bi-calendar-plus icon-text'></span> General</li>
                            <li><span className='bi bi-clock-history icon-text'></span> (GMT+05:30)</li>
                        </ul>

                    </div>
                    <div className='cards'>
                        <h3>Department & Designation</h3>
                        <ul>
                            <li><span className='bi bi-gear-wide-connected icon-text'></span> {userDepartment.departmentName}</li>
                            <li><span className='bi bi-diagram-3-fill icon-text'></span> {userDesignation.designationName}</li>
                        </ul>

                    </div>
                    <div className='cards'>
                        <h3>Reporting Manager</h3>
                        <ul>
                            <li><span className='bi bi-diagram-3-fill icon-text'></span> {user.reportingManager}</li>
                        </ul>

                    </div>
                </div>

                <div className='col-6 right-side-page'>
                    

                    <div className='cards'>
                        <h3>Basic Details</h3>
                        <div>
                            <div className='basicdetails'>
                                <div className='col-6'>Employee ID : </div>
                                <div className='col-6'>{user.employeeId}</div>
                            </div>
                            <div className='basicdetails'>
                                <div className='col-6'>Employee Name</div>
                                <div className='col-6'>{user.firstName} {user.lastName}</div>
                            </div>
                            <div className='basicdetails'>
                                <div className='col-6'>Email :</div>
                                <div className='col-6'>{user.emailId}</div>
                            </div>
                            <div className='basicdetails'>
                                <div className='col-6'>Age :</div>
                                <div className='col-6'>{user.age}</div>
                            </div>
                            <div className='basicdetails'>
                                <div className='col-6'>Gender :</div>
                                <div className='col-6'>{user.gender}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TimerLocation />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}