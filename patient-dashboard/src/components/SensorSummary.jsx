import React from 'react'

export default function SensorSummary({ data }) {
  // 假设传感器数据中有这些字段
  const {
    temperature,
    heartRate,
    bloodPressureSystolic,
    bloodPressureDiastolic,
    oxygenSaturation,
    respiratoryRate,
    bloodGlucose,
  } = data

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-xl font-semibold mb-3">Resumen de Sensores</h3>
      <ul className="space-y-2">
        <li><strong>Temperature:</strong> {temperature} °C</li>
        <li><strong>Heart Rate:</strong> {heartRate} bpm</li>
        <li><strong>Blood Pressure:</strong> {bloodPressureSystolic}/{bloodPressureDiastolic} mmHg</li>
        <li><strong>Oxygen Saturation:</strong> {oxygenSaturation} %</li>
        <li><strong>Respiratory Rate:</strong> {respiratoryRate} breaths/min</li>
        <li><strong>Blood Glucose:</strong> {bloodGlucose} mmol/L</li>
      </ul>
    </div>
  )
}
