import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LeadCapturePage from './LeadCapturePage.jsx'
import NewCustomersPage from './NewCustomersPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LeadCapturePage />} />
        <Route path="/new-customers" element={<NewCustomersPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
