// pages/PatientPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PatientDetails from '../components/PatientDetails'
import SensorSummary from '../components/SensorSummary'
import SensorChart from '../components/SensorChart'

export default function PatientPage() {
  const { id } = useParams()  // get patients' ID
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
    fetch('https://dummyjson.com/c/4eec-621e-42d9-946e')  // this mock API comes from https://dummyjson.com/custom-response
      .then(res => res.json())
      .then(data => {
        console.log('sensor data: ', data)
        setSensorData(data)
    })
      .catch(err => console.error('failed to get sensors data:', err))
  }, [])

  if (!patient || !sensorData) return <div>Loading...</div>  // 等待数据加载

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {patient.firstName} {patient.lastName} - Patient Details
      </h2>

      {/* 添加的患者信息展示 */}
      <PatientDetails patient={patient} />

      {/* Tab Switch*/}
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded-l ${activeTab === 'summary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
        <button
          className={`px-4 py-2 rounded-r ${activeTab === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('chart')}
        >
          Chart
        </button>
      </div>

      {/* 显示摘要 Tab */}
      {activeTab === 'summary' && <SensorSummary data={sensorData} />}
      
      {/* 显示图表 Tab */}
      {activeTab === 'chart' && <SensorChart data={sensorData} />}
    </div>
  )
}
