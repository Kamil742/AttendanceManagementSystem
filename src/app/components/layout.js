// import Link from "next/link";    
// import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
// import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
// import './layout.css'

// export default function Layout({ children }) {
//     return (
//         <div className="row">

//             <div className="dflex col-2 lists">
//             <img src="https://wallpapers.com/images/hd/cool-profile-picture-ld8f4n1qemczkrig.jpg" alt="" height='auto' width='40%' />

//                 <div className="childlist"><Link href='/dashboard'>Home</Link></div>
//                 <div className="childlist"><Link href='/components/profile'>Profile</Link></div>
//                 <div className="childlist"><Link href='/components/addEmployee'>New Employee</Link></div>
//                 <div className="childlist"><Link href='/components/attendance'>Attendance</Link></div>
//                 <div className="childlist"><Link href='/components/departments/addDepartment'>Department</Link></div>
//                 <div className="childlist"><Link href='/components/designation'>Designation</Link></div>
//                 <div className="childlist"><Link href='/components/organization/addOrganization'>Organization</Link></div>
//                 <div className="childlist"><Link href='/components/organization/BranchOffice/viewBranchOffice'>Branch Offices</Link></div>
//                 <div className="childlist"><Link href='/components/leave'>Leave Info</Link></div>
//                 <div className="childlist"><Link href='/components/leaveApplication/getLeaveApplications'>Leave Application</Link></div>
//                 <div className="childlist"><Link href='/components/holiday/viewHoliday'>Holiday</Link></div>
//                 <div className="childlist"><Link href='/components/logout'>Logout</Link></div>
//             </div>

//             <div className="col-10">{children}</div>
//         </div>
//     )
// }

import Link from "next/link";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import './layout.css'

export default function Layout({ children }) {
    return (
        <div className="row">



            <div className="dflex col-2 lists">
                <img src="https://wallpapers.com/images/hd/cool-profile-picture-ld8f4n1qemczkrig.jpg" alt="" height='auto' width='40%' />

                <div className="childlist"><Link href='/dashboard'>Home</Link></div>
                <div className="childlist"><Link href='/components/profile'>Profile</Link></div>
                <div className="childlist"><Link href='/components/addEmployee'>New Employee</Link></div>
                <div className="childlist"><Link href='/components/attendance'>Attendance</Link></div>
                <div className="childlist"><Link href='/components/departments/addDepartment'>Department</Link></div>
                <div className="childlist"><Link href='/components/designation'>Designation</Link></div>
                <div className="childlist"><Link href='/components/organization/addOrganization'>Organization</Link></div>
                <div className="childlist"><Link href='/components/organization/BranchOffice/viewBranchOffice'>Branch Offices</Link></div>
                <div className="childlist"><Link href='/components/leave'>Leave Info</Link></div>
                <div className="childlist"><Link href='/components/leaveApplication/getLeaveApplications'>Leave Application</Link></div>
                <div className="childlist"><Link href='/components/holiday/viewHoliday'>Holiday</Link></div>
            </div>

            <div className="col-10 children">{children}</div>
        </div>
    )
}