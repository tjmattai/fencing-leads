import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LeadCapturePage from './LeadCapturePage'
import NewCustomersPage from './NewCustomersPage'
import { pageview } from './analytics'

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    // Track page views
    pageview(location.pathname)
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<LeadCapturePage />} />
      <Route path="/new-customers" element={<NewCustomersPage />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
