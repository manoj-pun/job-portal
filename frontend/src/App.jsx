import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJob from './pages/ManageJob'
import ViewApplication from './pages/ViewApplication'
import "quill/dist/quill.snow.css"

const App = () => {

  const {showRecruiterLogin,showLogin} = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin &&  <RecruiterLogin/>}
      {showLogin &&  <Login/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/apply-job/:id" element={<ApplyJob/>} />
        <Route path="/applications" element={<Applications/>} />
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path='add-job' element={<AddJob/>} />
          <Route path='manage-job' element={<ManageJob/>} />
          <Route path='view-applications' element={<ViewApplication/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
