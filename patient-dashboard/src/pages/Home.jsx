import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => setPatients(data.users))
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Patients List</h2>
      <ul className="space-y-2">
        {patients.map(patient => (
          <li key={patient.id} className="border p-3 rounded hover:shadow">
            <Link to={`/patient/${patient.id}`} className="text-white hover:underline">
              {patient.firstName} {patient.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
