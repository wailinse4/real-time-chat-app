import React from 'react'

import Navbar from './components/Navbar.jsx'

import HomePage from "./pages/HomePage.jsx" 
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SettingPage from "./pages/SettingPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/setting" element={<SettingPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  )
}

export default App
