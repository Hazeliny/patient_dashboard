// pages/PatientPage.jsx
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
  const [activeTab, setActiveTab] = useState('summary') // 默认展示摘要 Tab

  // get patients' detailed data
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => setPatient(data))
  }, [id])

  // get sensor's data
  useEffect(() => {
    fetch('https://dummyjson.com/c/9e09-78ef-4301-8694')  // this mock API comes from https://dummyjson.com/custom-response
      .then(res => res.json())
      .then(data => {
        console.log('sensor data: ', data)
        setSensorData(data)
    })
      .catch(err => console.error('failed to get sensors data:', err))
  }, [])

  if (!patient || !sensorData) return <div className="text-center text-gray-600 mt-20">Loading...</div>  // 等待数据加载

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
      {/* 添加的患者信息展示 */}
        <div className="lg:w-1/3.9">
          <PatientDetails patient={patient} />
        </div>

        <div className="flex-1">
        {/* Tab Switch*/}
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

        {/* 显示摘要 Tab */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'summary' && <SensorSummary data={sensorData} />}
      
          {/* 显示图表 Tab */}
          {activeTab === 'chart' && <SensorChart data={sensorData} />}
        </div>
      </div>
    </div>
    </div>
  )
}
