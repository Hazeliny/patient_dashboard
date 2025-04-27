import React from 'react'

export default function PatientDetails({ patient }) {

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <div className="p-4 bg-gray-100 shadow rounded">
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-4 text-center">Patient Details</h3>
        </div>
      
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center space-x-12">
            <div>
              <h3 className="text-xl font-medium">Full Name</h3>
              <p>{patient.firstName} {patient.lastName}</p>
            </div>
            <img 
              src={patient.image} 
              alt="Patient" 
              className="w-20 h-20 rounded-full object-cover shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div>
            <h3 className="text-xl font-medium">Age</h3>
            <p>{patient.age}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Birth Date</h3>
            <p>{patient.birthDate}</p>
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
    </div>
  )
}
