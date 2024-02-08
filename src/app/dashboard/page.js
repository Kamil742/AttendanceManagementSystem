'use client'
import React, { useState, useEffect } from "react";
import "./page.css";
import {email} from "../util/constants"

const TimerLocation = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [startTime, setStartTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [startTimer, seStartTimer] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const[user, setUser] = useState([])


  const locationApi = async (position, status) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiKey = "pk.997a569a2b5c1263a7edcf7312a209d0";
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    const location = data.display_name;
    sendAttendanceStatus(status, location);
  };

  const sendAttendanceStatus = async (status, location) => {
    const response = await fetch(
      `http://localhost:8282/api/attendance/${status}/${email}?location=${location}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(status, location);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => locationApi(position, attendanceStatus),
      (error) => console.error("Error getting location:", error)
    );
  };

  const toggleStatus = async () => {
    const newStatus =
      attendanceStatus === "check-in" ? "check-out" : "check-in";
    setAttendanceStatus(newStatus);
    getLocation();
    fetchDataAndStartTime();

    try{
      setTimeout(() => {
        window.location.reload(true);
      }, 3000)
    }
    catch(error){
      console.error('Error:', error);
    }
    
  };

  const fetchStartTime = async () => {
    try {
      const response = await fetch(
        `http://localhost:8282/api/attendance/fetch-start-time/${email}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      setStartTime(new Date(data.time).getTime());
      seStartTimer(data.time);
      setStatus(data.status);
      if(data.status === "IN"){
        setAttendanceStatus("check-out")
      }
      else{
        setAttendanceStatus("check-in")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const updateTimer = () => {
    let timeDifference;

    if (status === "IN") {
      const currentTime = new Date().getTime();
      timeDifference = currentTime - startTime;

      const newHours = String(
        Math.floor(timeDifference / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0")
      );
      const newMinutes = String(
        Math.floor((timeDifference / (1000 * 60)) % 60)
          .toString()
          .padStart(2, "0")
      );
      const newSeconds = String(
        Math.floor((timeDifference / 1000).toFixed(0) % 60)
          .toString()
          .padStart(2, "0")
      );

      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    } else {
      if (startTimer) {
        const time = new Date(startTimer);
        const hours = time.getHours().toString().padStart(2, "0");
        const minutes = time.getMinutes().toString().padStart(2, "0");
        const seconds = time.getSeconds().toString().padStart(2, "0");

        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }
  };
  const fetchDataAndStartTime = async () => {
    try {
      await fetchStartTime();
      if (status === "IN") {
        const intervalId = setInterval(updateTimer, 1000);
        updateTimer();
        return () => clearInterval(intervalId);
      } else {
        updateTimer();
      }
    } catch (error) {
      console.error("Error setting up timer:", error);
    }
  };
  useEffect(() => {
    fetchDataAndStartTime();
  }, [status]);

  const fetchEmployee = async () => {
    const response = await fetch(`http://localhost:8282/api/employees/getEmployee/${email}`)
    const data = await response.json()
    setUser(data)
    console.log(data);
}

useEffect(() => {
    fetchEmployee()
}, [])
  
  return (
    <>
    {/* <div className="name"><h3>Welcome <span>{user.firstName} {user.lastName}</span> </h3></div> */}
    <div className="superParent">
      <div className="subparent">
      <div className="status">Status: <span>{status}</span></div>

      <div className="timer">
        <span id="hours">{hours}</span>: <span id="minutes">{minutes}</span>:
        <span id="seconds">{seconds}</span>
        <span> Hrs</span>
      </div>
      
      <div>
      <button
        className={`btn ${
          attendanceStatus === "check-in" ? "btn-success" : "btn-danger"
        }`}
        onClick={toggleStatus}
        disabled={["ABSENT", "LEAVE", "OUT"].includes(status)}
      >
        {attendanceStatus === "check-in" ? "Check-In" : "Check-Out"}
      </button>
      </div>

      
      </div>
    </div></>
  );
};

export default TimerLocation;