'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddLeaveForm() {
    const router = useRouter()

    const [user, setUser] = useState({
            
    })



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:8282/api/employees/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('API Response:', responseData);
            router.push('/dashboard');
          } else {
            console.error('Failed to submit form. Server returned:', response.status, response.statusText);
            const errorResponseData = await response.json();
            console.error('Error Response Body:', errorResponseData);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    
      };
}