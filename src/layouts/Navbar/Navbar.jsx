import { Link } from "react-router-dom";

import React, { useState } from "react";

import "./Navbar.css";


function Navbar({ tab, setTab }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
}

  return (
    <div className="sidebar-content1">

    <Link to= {"/home"}>
      <button className={( tab === 'home' ? 'button-nav-primary' : 'button-nav-secondary')}   onClick={() => setTab('home')} >Home</button> <br /><br />
    </Link>

    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>

          <Link to= {"/upload"}>
            <button className={ ('button-nav-secondary')} onClick={() => {toggleSidebar();setTab('upload') }}>
                {isExpanded ? '▼' : '▷'}
                &nbsp;Administrator
            </button> <br /><br />
          </Link>
            {isExpanded && (
                <div className="sidebar-content2">
                  <Link to= {"/upload"}>
                    <button className={(tab === 'upload' ? 'button-nav-primary' : 'button-nav-secondary')}   onClick={() => setTab('upload')}>Upload Document</button><br /><br />
                  </Link>

                  <Link to= {"/manage"}>
                  <button className={(tab === 'manage' ? 'button-nav-primary' : 'button-nav-secondary')}   onClick={() => setTab('manage')} >Manage Document</button><br /><br />
                  </Link>

                  <Link to= {"/permission"}>
                    <button className={(tab === 'permission' ? 'button-nav-primary' : 'button-nav-secondary')}   onClick={() => setTab('permission')} >Permission</button><br /><br />
                  </Link>

                  <Link to= {"/report"}>
                    <button className={(tab === 'report' ? 'button-nav-primary' : 'button-nav-secondary' )}   onClick={() => setTab('report')} >Report</button><br /><br /> 
                  </Link>

                  

                </div>
            )}    
                  <br />
                  <Link to= "/developer">
                    <button className={( tab === 'developer' ? 'button-nav-primary' : 'button-nav-secondary')} onClick={() => {setTab('developer'); }} >About Developer</button>
                  </Link>
                  <br /><br />
                  <Link to= {"/logout"}>
                  <button className='button-nav mt-3'  style={{ border: "none", background: "none", color: "white" }} onClick={() => {toggleSidebar(); setTab('home'); }}>Logout <span className='bi bi-box-arrow-in-right'></span></button><br /><br />
                 </Link>
       </div>  
    </div>
  )
}

export default Navbar;
