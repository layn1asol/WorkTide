import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import FindWork from './pages/FindWork'
import FindFreelancers from './pages/FindFreelancers'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import FreelancerProfile from './pages/FreelancerProfile'
import TaskManagement from './pages/TaskManagement'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { DropdownProvider, useDropdown } from './contexts/DropdownContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function AppContent() {
  const { isDropdownOpen } = useDropdown();
  
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 pt-16 flex flex-col">
        <Navbar />
        <div 
          className={`flex-grow ${isDropdownOpen ? 'filter blur-sm transition-all ease-in-out duration-300' : ''}`}
          onClick={() => isDropdownOpen && document.dispatchEvent(new MouseEvent('mousedown'))}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/find-work" element={<FindWork />} />
            <Route path="/find-freelancers" element={<FindFreelancers />} />
            <Route path="/freelancer/:id" element={<FreelancerProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-tasks"
              element={
                <ProtectedRoute>
                  <TaskManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <DropdownProvider>
            <AppContent />
          </DropdownProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
