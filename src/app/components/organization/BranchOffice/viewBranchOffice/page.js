
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './branchOffice.css';
import { useRouter } from 'next/navigation';

export default function BranchLocation() {
  const [branchLocation, setBranchLocation] = useState([]);
  const [organization,setOrganization] = useState([]);
  const [deleteIconsVisible, setDeleteIconsVisible] = useState(false);
  const router = useRouter();

  const locationApi = async () => {
    const response = await fetch('http://localhost:8282/api/locations/getBranchLocations');
    const data = await response.json();
    setBranchLocation(data);
    setOrganization(data[0].organization)
    console.log(organization,"org")
    console.log(data);
  };

  useEffect(() => {
    locationApi();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this location?');

    if (confirmDelete) {
      try {
        // const response = await fetch(`http://localhost:8282/api/holidays/delete/${id}`, {
        //   method: 'DELETE',
        // });

        if (response.ok) {
        locationApi()
          router.push('/components/organization/BranchOffice/viewBranchOffice');
        } else {
          console.error('Failed to delete branch office:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error deleting office:', error);
      }
    }
  };

  const renderActions = (id) => {
    return (
      <div>
        {deleteIconsVisible && (
          <button onClick={() => handleDelete(id)} className="btn btn-danger">
            <span className="bi bi-x-lg"></span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="addOffice row">
        <div className="col-10">
          <h4 className="heading">{organization.organizationName}</h4>
          <h3 className="heading">Office Locations</h3> 
        </div>
        <div className="col-1">
          <button onClick={() => setDeleteIconsVisible((prev) => !prev)}>
            <span className="bi bi-pencil-square"></span>
          </button>
        </div>
        <div className="col-1">
          <button>
            <Link href="/components/organization/BranchOffice/addBranchOffice">
              <span className="bi bi-plus-square-fill"></span>
            </Link>
          </button>
        </div>
      </div>
      <table className="tableData">
        <thead>
          <tr>
            <td>Address</td>
            <td>Location</td>
            <td>Check In Time</td>
            <td>Check Out Time</td>
            {deleteIconsVisible? <td>Actions</td>:<td></td>}
          </tr>
        </thead>
        <tbody>
          {branchLocation.map((item) => (
            <tr key={item.locationId}>
              <td>{item.locationDetails}</td>
              <td>{item.locationName}</td>
              <td>{item.checkInTime}</td>
              <td>{item.checkOutTime}</td>
              <td>{renderActions(item.locationId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
