// components/PatientDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function PatientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`)
        const data = await res.json()
        setPatient(data)
      } catch (error) {
        console.error('Error fetching patient data:', error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchPatientDetails()
  }, [id])
  

  if (loading) {
    return <div>Loading...</div>
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex items-center justify-between mb-4">
        <button
            onClick={() => navigate(-1)}  // 或 navigate('/patients')
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            ← Back
        </button>
        <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium">Full Name</h3>
          <p>{patient.firstName} {patient.lastName}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Age</h3>
          <p>{patient.age}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Gender</h3>
          <p>{patient.gender}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Email</h3>
          <p>{patient.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Phone</h3>
          <p>{patient.phone}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Address</h3>
          <p>{patient.address?.address}, {patient.address?.city}, {patient.address?.state}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">University</h3>
          <p>{patient.university}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Company</h3>
          <p>{patient.company?.name} - {patient.company?.department}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Blood Group</h3>
          <p>{patient.bloodGroup}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Height</h3>
          <p>{patient.height} cm</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Weight</h3>
          <p>{patient.weight} kg</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Eye Color</h3>
          <p>{patient.eyeColor}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Hair Color</h3>
          <p>{patient.hair?.color} - {patient.hair?.type}</p>
        </div>
      </div>
    </div>
  )
}
