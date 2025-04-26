import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PatientDetails from '../components/PatientDetails'
import SensorSummary from '../components/SensorSummary'
import SensorChart from '../components/SensorChart'

export default function PatientPage() {
  const { id } = useParams()  // get patients' ID
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [sensorData, setSensorData] = useState(null)
  const [activeTab, setActiveTab] = useState('summary') // Default display summary tab

  // get patient info
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => setPatient(data))
  }, [id])

  // get the mock real-time data from sensor through WebSocket
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080'); // connect the local WebSocket service

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received sensor data:', data);
      setSensorData(data); // Update everytime new data is received
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Close connection when the component is uninstalled
    return () => {
      socket.close();
    };
  }, []);

  if (!patient || !sensorData) return (
    <div className="text-center text-gray-600 mt-20">
      Loading...
    </div>
  )  // waiting for loading

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-extrabold text-gray-700 text-center flex-1">
          {patient.firstName} {patient.lastName} - Patient Details
        </h2>
        <div className="w-20"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Add the patient info at the left */}
        <div className="lg:w-1/3.9">
          <PatientDetails patient={patient} />
        </div>

        <div className="flex-1">
          {/* Tab Switch */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 rounded-l-full ${activeTab === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 transition`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`px-6 py-2 rounded-r-full ${activeTab === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 transition`}
              onClick={() => setActiveTab('chart')}
            >
              Chart
            </button>
          </div>

          {/* Display Summary Tab */}
          <div className="bg-white shadow rounded-lg p-6">
            {activeTab === 'summary' && <SensorSummary data={sensorData} />}
            {/* Display Chart Tab */}
            {activeTab === 'chart' && <SensorChart data={sensorData} />}
          </div>
        </div>
      </div>
    </div>
  )
}
