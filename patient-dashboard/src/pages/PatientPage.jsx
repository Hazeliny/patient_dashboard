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
  const [dataSource, setDataSource] = useState('static') // 'static' or 'realtime'

  // get patient info
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => setPatient(data))
  }, [id])

  // get the mock real-time data from sensor through WebSocket or static data from DummyJSON according to the user's choice
  useEffect(() => {
    let socket

    if (dataSource === 'static') {
        fetch('https://dummyjson.com/c/cc06-e16f-4842-bdc6')
          .then(res => res.json())
          .then(data => {
            console.log('Static sensor data from DummyJSON: ', data)
            setSensorData(data)
          })
          .catch(err => console.error('Failed to get static sensors data:', err))
    } else if (dataSource === 'realtime') {
//      socket = new WebSocket('ws://localhost:8080'); // Connect the local WebSocket service
      socket = new WebSocket(import.meta.env.VITE_SOCKET_URL); // In order to be deployed to Azure // patientId can be added like: `${import.meta.env.VITE_SOCKET_URL}?patientId=${id}` 

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Real-time sensor data from custom API:', data);
        setSensorData(data); // Update everytime new data is received
      };

      socket.onerror = (error) => console.error('WebSocket error:', error);
      socket.onclose = () => console.log('WebSocket disconnected');
    };

    // Close connection when the component is uninstalled
    return () => {
        if (socket) { socket.close();};
    };
  }, [dataSource]); // Here dependency array can be written to support multi-patient: [dataSource, id] to match socket with patientId

  if (!patient || !sensorData) return (
    <div className="text-center text-gray-600 mt-20">
      Loading...
    </div>
  )  // waiting for loading

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <a
          href="#"
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:underline hover:text-white font-medium"
        >
          ← Back
        </a>
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
          {/* Tab Switch + Radio Buttons */}
          <div className="flex justify-center items-center mb-6 gap-2">
            <div className="flex">
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

            {/* Radio buttons for data source */}
            <div className="flex flex-col items-center ml-12 space-x-7 space-y-1 text-xs">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="dataSource"
                  value="static"
                  checked={dataSource === 'static'}
                  onChange={() => setDataSource('static')}
                  className="h-3 w-3" 
                />
                <span>Static Data</span>
              </label>

              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="dataSource"
                  value="realtime"
                  checked={dataSource === 'realtime'}
                  onChange={() => setDataSource('realtime')}
                  className='h-3 w-3' 
                />
                <span>Real-Time Data</span>
              </label>
            </div>
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
