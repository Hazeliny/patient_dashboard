import React from 'react'

export default function SensorSummary({ data }) {
  // 假设传感器数据中有这些字段
  const { temperature, heartRate, bloodPressure } = data

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-xl font-semibold mb-3">Sensor Summary</h3>
      <ul>
        <li><strong>Temperature:</strong> {temperature} °C</li>
        <li><strong>Heart Rate:</strong> {heartRate} bpm</li>
        <li><strong>Blood Pressure:</strong> {bloodPressure} mmHg</li>
      </ul>
    </div>
  )
}
