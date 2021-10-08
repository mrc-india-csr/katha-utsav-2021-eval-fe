import React from 'react'
import '../styles/dashboard.scss'
import axios from "axios";
import logo from '../client/assets/logo.png';
import logoutIcon from '../client/assets/logout.png';
import StatusTile from '../components/entrypoints/statusTile';

const Dashboard = (props) => {
  const logoutClick = () => {
    console.log('logout called');
    axios.get('/api/logout').then((res) => {
      window.location = res.data.redirect;
    }).catch((e) => {
      console.log(e)
    });
  }

  return(
    <div className="dashboard">
      <div className="appBar">
        <div>
          <img src={logo} className="logo" /> 
          <span className="title">Katha Utsav Evaluation Portal</span>    
        </div>
          <button className="logout" onClick={logoutClick}>
          <img src={logoutIcon} className="logoutIcon" /> 
            Logout
          </button>
      </div>
      <StatusTile/>
    </div>
  )
};

export default Dashboard;