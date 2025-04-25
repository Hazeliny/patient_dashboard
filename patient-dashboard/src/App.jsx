import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientPage from './pages/PatientPage'

export default function App() {
  return (
    <Router>
      <div className="p-4 font-sans">
        <h1 className="text-3xl font-bold mb-4">🏥 Patient Dashboard</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient/:id" element={<PatientPage />} />
        </Routes>
      </div>
    </Router>
  )
}
