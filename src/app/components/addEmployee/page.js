// employee page.js
"use client";
import React, { useState, useEffect } from "react";
import "./employee.css";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const router = useRouter();

  const [employee, setEmployee] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    emailId: "",
    age: 0,
    phone: "",
    gender: "",
    isReportingManager: false,
    reportingManager: "",
    address: {
      buildingNo: 0,
      buildingName: "",
      streetName: "",
      city: "",
      district: "",
      state: "",
      country: "",
      postalCode: 0,
    },
    designation: {
      designationId: 0,
    },
    location: {
      locationId: 0,
    },
  });

  const [designations, setDesignations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [reportingManagers, setReportingManagers] = useState([]);

  const {
    imageUrl,
    firstName,
    lastName,
    emailId,
    age,
    phone,
    gender,
    isReportingManager,
    reportingManager,
    address,
    designation,
    location,
  } = employee;

  const onInputChange = (e) => {
    const targetName = e.target.name;

    // Check if the input belongs to the address, designation, location, or reportingManager
    if (targetName.startsWith("address")) {
      setEmployee({
        ...employee,
        address: {
          ...address,
          [targetName.split(".")[1]]: e.target.value,
        },
      });
    } else if (targetName.startsWith("designation")) {
      setEmployee({
        ...employee,
        designation: {
          ...designation,
          [targetName.split(".")[1]]: e.target.value,
        },
      });
    } else if (targetName.startsWith("location")) {
      setEmployee({
        ...employee,
        location: {
          ...location,
          [targetName.split(".")[1]]: e.target.value,
        },
      });
    } else if (targetName === "reportingManager") {
      setEmployee({
        ...employee,
        reportingManager: e.target.value,
      });
    } else {
      setEmployee({
        ...employee,
        [targetName]: e.target.value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8282/api/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("API Response:", responseData);
        console.log("success");
        router.push("/components/profile");
      } else {
        console.error(
          "Failed to submit form. Server returned:",
          response.status,
          response.statusText
        );
        const errorResponseData = await response.json();
        console.error("Error Response Body:", errorResponseData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    console.log(employee);
  };

  const getDesignations = async () => {
    try {
      const response = await fetch(
        "http://localhost:8282/api/designations/getDesignations"
      );
      if (response.ok) {
        const data = await response.json();
        setDesignations(data);
        console.log(data);
      } else {
        console.error(
          "Failed to fetch designations. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await fetch(
        "http://localhost:8282/api/locations/getBranchLocations"
      );
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
        console.log(data);
      } else {
        console.error(
          "Failed to fetch locations. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const getReportingManagers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8282/api/employees/getReportingManagers"
      );
      if (response.ok) {
        const data = await response.json();
        setReportingManagers(data);
        console.log(data);
      } else {
        console.error(
          "Failed to fetch reporting managers. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching reporting managers:", error);
    }
  };

  useEffect(() => {
    getDesignations();
    getLocations();
    getReportingManagers();
  }, []);

  return (
    <div>
      <div className="mainpage">
        {/* <h2 className="text-center title">Create Employee</h2> */}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="subpage">
            {/* start */}
            <div className="cards">
                <h3 className="text-center text-primary mb-4">Personal Details</h3>
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="imageUrl"
                  value={employee.imageUrl}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Image URL"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={employee.firstName}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter First Name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={employee.lastName}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Last Name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="emailId" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="emailId"
                  value={employee.emailId}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Email ID"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={employee.age}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Age"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={employee.phone}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Phone"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  name="gender"
                  value={employee.gender}
                  onChange={(e) => onInputChange(e)}
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {/* end */}

            {/* start */}
            <div className="cards">
            <h3 className="text-center text-primary mb-4">Address Details</h3>
              <div className="mb-3">
                <label htmlFor="address.buildingNo" className="form-label">
                  Building Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="address.buildingNo"
                  value={employee.address.buildingNo}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Building Number"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address.buildingName" className="form-label">
                  Building Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address.buildingName"
                  value={employee.address.buildingName}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Building Name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address.streetName" className="form-label">
                  Street Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address.streetName"
                  value={employee.address.streetName}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Street Name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address.city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address.city"
                  value={employee.address.city}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter City"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address.district" className="form-label">
                  District
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address.district"
                  value={employee.address.district}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter District"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address.state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address.state"
                  value={employee.address.state}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter State"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address.country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address.country"
                  value={employee.address.country}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Country"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address.postalCode" className="form-label">
                  Postal Code
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="address.postalCode"
                  value={employee.address.postalCode}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Postal Code"
                  required
                />
              </div>
            </div>
            {/* end */}
          </div>

            {/* start */}

            <div className="officeData">
              <div className="cards col-6">
              <h3 className="text-center text-primary mb-4">Designation Details</h3>
                <div className="mb-3">
                  <label htmlFor="reportingManager" className="form-label">
                    Reporting Manager
                  </label>
                  <select
                    className="form-select"
                    name="reportingManager"
                    value={reportingManager}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option value="" disabled>
                      Select Reporting Manager
                    </option>
                    {reportingManagers.map((manager) => (
                      <option key={manager} value={manager}>
                        {manager}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="designation.designationId"
                    className="form-label"
                  >
                    Designation
                  </label>
                  <select
                    className="form-select"
                    name="designation.designationId"
                    value={designation.designationId}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option
                        key={designation.designationId}
                        value={designation.designationId}
                      >
                        {designation.designationName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="location.locationId" className="form-label">
                    Location
                  </label>
                  <select
                    className="form-select"
                    name="location.locationId"
                    value={location.locationId}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option
                        key={location.locationId}
                        value={location.locationId}
                      >
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" mb-4">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      name="isReportingManager"
                      value={true}
                      onChange={(e) => onInputChange(e)}
                    />

                    <label
                      htmlFor="isReportingManager"
                      className="form-check-label"
                    >
                      Do you agree to designate this employee as a Reporting
                      Manager?
                    </label>
                  </div>
                </div>
                <div className="button">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </div>
            {/* end */}
        </form>
      </div>
    </div>
  );
}
