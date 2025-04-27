import React from 'react'

export default function SensorSummary({ data }) {
  // Assume that the sensor has the following fields
  const {
    temperature,
    heartRate,
    bloodPressure,
    oxygenSaturation,
    respiratoryRate,
    bloodGlucose,
  } = data

  const bloodPressureSystolic = bloodPressure?.systolic ?? ''
  const bloodPressureDiastolic = bloodPressure?.diastolic ?? ''

  return (
    <div className="p-4 bg-gray-100 shadow rounded">
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
