import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Login from './components/Login'

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
      </Routes>
    </div>
  )
}

export default App
