// import Link from "next/link";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
// import "./layout.css";

// export default function Layout({ children }) {
//     return (
//         <div>
        
//             <div className="row">
//                 <div className="dflex col-2 lists">
//                     <div className="childlist">
//                         <Link href="/components/profile">
//                             <span className="bi bi-person-fill"> </span>&nbsp; Profile
//                         </Link>
//                     </div>
//                     <div className="childlist">
//                         <Link href="/components/attendance">
//                             <span className="bi bi-calendar-check-fill"></span>{" "}
//                             &nbsp;Attendance
//                         </Link>
//                     </div>
//                     <div className="childlist">
//                         <Link href="/components/timetracker">
//                             <span className="bi bi-clock-fill"></span> &nbsp; Time Tracker
//                         </Link>
//                     </div>
//                     <div className="childlist">
//                         <Link href="/components/perfomance">
//                             <span className="bi bi-pencil-fill"></span>&nbsp; Perfomance
//                         </Link>
//                     </div>
//                     <div className="childlist">
//                         <Link href="/components/organisation">
//                             <span className="bi bi-buildings-fill"></span>&nbsp; Organization
//                         </Link>
//                     </div>
                    
//                 </div>

//                 <div className="col-10">{children}</div>
//             </div>
//         </div>
//     );
// }


import Link from "next/link";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./layout.css";

export default function Layout({ children }) {
    return (
        <div>
            <div className="row">
                <div className="dflex col-2 lists">
                    <div className="childlist">
                        <Link href="/components/profile">
                            <span className="bi bi-person-fill"> </span>&nbsp; Profile
                        </Link>
                    </div>
                    <div className="childlist">
                        <Link href="/components/attendance">
                            <span className="bi bi-calendar-check-fill"></span>
                            &nbsp;Attendance
                        </Link>
                    </div>
                    <div className="childlist">
                        <Link href="/components/timetracker">
                            <span className="bi bi-clock-fill"></span> &nbsp; Leave Tracker
                        </Link>
                    </div>
                    
                    <div className="childlist">
                        <Link href="/components/organisation">
                            <span className="bi bi-buildings-fill"></span>&nbsp; Organization
                        </Link>
                    </div>
                
                </div>

                <div className="col-10 children">{children}</div>
            </div>
        </div>
    );
}