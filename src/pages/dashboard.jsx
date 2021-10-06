import React from 'react'
import '../styles/global.scss'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography  from '@material-ui/core/Typography';
import axios from "axios";
import logo from '../client/assets/logo.png';
import logoutIcon from '../client/assets/logout.png';
import StatusTile from './statusTile';

const useStyles = makeStyles(theme => ({
  dashboard:{
    backgroundColor:"#f6f6f6"
  },
  title:{
    fontFamily: 'Poppins',
    fontSize: '30px',
    lineHeight: '45px',
    fontWeight: '400',
    letterSpacing: '0.01em'
  },
  appBar: {
    backgroundColor: "#ffffff",
    color: "black",
    marginBottom: "25px",
    position: "relative",
    boxShadow: "none",
  },
  logo:{
    marginRight:'25px',
    width: '50px',
    height: '50px'
  },
  logout:{
    marginLeft: 'auto',
    color:'red',
    fontWeight: '600',
    textTransform: 'none'
  },
}))

const Dashboard = (props) => {
  const classes = useStyles();
  const logoutClick = () => {
    console.log('logout called');
    axios.get('/api/logout').then((res) => {
      window.location = res.data.redirect;
    }).catch((e) => {
      console.log(e)
    });
  }

  return(
    <div className={classes.dashboard}>
      <AppBar className={classes.appBar}>
        <ToolBar>
          <img src={logo} className={classes.logo} /> 
          <Typography className={classes.title}>Katha Utsav Evaluation Portal</Typography>          
          <Button className={classes.logout} onClick={logoutClick}>
            <img src={logoutIcon} style={{ width: '20px', margin: '5px'}} /> 
            Logout
          </Button>
        </ToolBar>        
      </AppBar>
      <StatusTile/>
    </div>
  )
};

export default Dashboard;
