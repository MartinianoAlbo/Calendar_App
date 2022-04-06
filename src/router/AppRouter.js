import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<CalendarScreen />} /> 
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/registrar" element={<RegisterScreen/>} />
          <Route path="*" element={<CalendarScreen />} /> 
        </Routes>
        
      </Router>
    </>
  )
}
