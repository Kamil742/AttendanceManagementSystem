"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import "./page.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="mainpage">
      <div className="bgblur">
        <div className="login">
          <button
            className="btn btn-danger btn-lg login"
            onClick={() => router.push("/login")}>
            Login
          </button>
        </div>
        <div className="heading">Welcome to our Website</div>
      </div>
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import { initializeKeycloak } from "../app/util/keycloak";
// import { useRouter } from "next/navigation";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
// import "./page.css";

// export default function Home() {
//   const router = useRouter();
//   const [token, setToken] = useState(null);

//   const keycloakInit = async () => {
//     try {
//       const keycloak = await initializeKeycloak();
//       console.log('Keycloak initialized successfully');

//       // Get the token
//       const accessToken = keycloak.token;

//       // Log the token
//       console.log('Access Token:', accessToken);

//       // Extract the username from the token
//       const username = accessToken ? keycloak.tokenParsed.preferred_username : null;

//       // Store the username in local storage
//       localStorage.setItem("username", username);

//       // Set the token state for rendering purposes (optional)
//       setToken(accessToken);
//     } catch (error) {
//       console.error('Failed to initialize Keycloak:', error);
//     }
//   };

//   return (
//     <div className="mainpage">
//       <div className="bgblur">
//         <div className="login">
//           <button
//             className="btn btn-danger btn-lg login"
//             onClick={() => keycloakInit()}
//           >
//             Login
//           </button>
//         </div>
//         <div className="heading">Welcome to our Website</div>

//         {/* Display the token (optional) */}
//         {token && (
//           <div>
//             <h3>Access Token:</h3>
//             <pre>{JSON.stringify(token, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
