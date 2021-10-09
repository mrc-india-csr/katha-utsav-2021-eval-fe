import React from 'react'
import '../styles/global.scss'
import '../styles/dashboard.scss'
import axios from "axios";
import logo from '../client/assets/logo.png';
import logoutIcon from '../client/assets/logout.png';
import StatusTile from '../components/entrypoints/statusTile';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
 
const Dashboard = (props) => {
  const logoutClick = () => {
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
            <span>Logout</span>
          </button>
      </div>      
      <StatusTile/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </div>
  )
};

export default Dashboard;