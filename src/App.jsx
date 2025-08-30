import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Dashboard from './pages/MainPage'
import Patients from './pages/Patient';
import ParticularPatientDetail from './pages/ParticularPatient'
import Settings from './pages/Setting';
import Alerts from './pages/Alert';
import Analytics from './pages/Analytics';
import Login from './pages/Login'


function App() {


  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/patients" element={<Patients />} />
    <Route path="/patient/:id" element={<ParticularPatientDetail />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/alerts" element={<Alerts />} />
    <Route path="/analytics" element={<Analytics/>} />
   </Routes>
   </BrowserRouter>
    </>
  )
}
export default App;

