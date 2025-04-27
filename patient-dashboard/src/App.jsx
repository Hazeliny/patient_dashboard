import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientPage from './pages/PatientPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200 p-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h1 className="text-5xl font-bold mb-8 text-center text-grey drop-shadow-lg">🏥 Patient Dashboard</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient/:id" element={<PatientPage />} />
        </Routes>
      </div>
    </Router>
  )
}
