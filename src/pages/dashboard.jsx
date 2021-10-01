import React from 'react'
import '../styles/global.scss'
import axios from "axios";

const Dashboard = () => {
  const logoutClick = () => {
    console.log('logout called');
    axios.get('/api/logout').then((res) => {
      window.location = res.data.redirect;
    }).catch((e) => {
      console.log(e)
    });
  }

  return(
    <div>
      <button onClick={logoutClick}>Logout</button>
    </div>
  )
};

export default Dashboard;
