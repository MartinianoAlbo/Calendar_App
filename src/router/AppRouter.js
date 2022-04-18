import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { useDispatch, useSelector } from 'react-redux'
import { startChecking } from '../actions/auth'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'

import '../styles.css'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const { checking } = useSelector((state) => state.AUTH)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) {
    return (
      <div className="container flex items-center">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className='animate__animated animate__fadeIn'>
      <Router>

        <Routes>
          <Route
            index
            path="/"
            element={
              <PrivateRoutes >
                <CalendarScreen/>
              </PrivateRoutes>
            }
            
          />
          <Route
            path="/login"
            element={
              <PublicRoutes >
                <LoginScreen />
              </PublicRoutes>
            }
          />
          <Route
            path="/registrar"
            element={
              <PublicRoutes>
                <RegisterScreen />
              </PublicRoutes>
            }
          />
          <Route path="*" element={<CalendarScreen />} />
        </Routes>
      </Router>
    </div>
  )
}
