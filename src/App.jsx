import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout/Layout'

import Home from './pages/Home/Home'
import Manage from './pages/Manage/Manage'
import Permission from './pages/Permission/Permission'
import Report from './pages/Report/Report'
import Logout from './pages/Logout/Logout'
import Upload from './pages/Upload/Upload'
import Login from './pages/Login/Login'
import Loginadmin from './pages/Login/Loginadmin'
import Developer from './pages/Developer/Developer'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import './App.css'

const inTab = ''
function App() {

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [tab, setTab] = useState('')

  useEffect(() => {
    setTab(inTab)
  }, [])
  return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route element={<Layout  tab={tab} setTab={setTab}/>}>
              <Route path={"/"} element={<Home />} />
              <Route path= {'/home'} element={<Home />} />
              <Route path= {'/manage'} element={<Manage />} />
              <Route path= {'/permission'} element={<Permission />} />
              <Route path= {'/report'} element={<Report />} />
              <Route path= {'/upload'} element={<Loginadmin token={token}><Upload/></Loginadmin>} />
              <Route path= {'/developer'} element={<Developer/>}/>
              <Route path= {'/logout'} element={<Logout setToken={setToken}/>} />
            </Route>
            <Route path="login" element={<Login setToken={setToken}/>}></Route>
          </Routes>
        </HashRouter>
      </div> 
  )
  

}

export default App
