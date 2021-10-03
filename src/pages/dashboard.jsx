import React from 'react'
import '../styles/global.scss'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography  from '@material-ui/core/Typography';
import axios from "axios";
import logo from '../client/assets/logo.png';


const useStyles = makeStyles(theme => ({
  dashboard:{
    backgroundColor:"#f8f8fb"
  },
  appBar: {
    backgroundColor: "#ffffff",
    color: "black",
    marginBottom: "50px",
    position: "relative",
    boxShadow: "none",
  },
  logo:{
    marginRight:'5px',
    width: '50px',
    height: '50px'
  },
  logout:{
    marginLeft: 'auto',
    color:'red',
    fontWeight: '600',
  },
  gridContainer:{
    flexGrow: 1,
  },
  tile:{
    marginRight: '10px'
  },
  paper: {
    width: "10vw",
    height: "5vw",
    textAlign: "left",
    fontSize: "20px",
    fontWeight: "700",
    color: "black",
    padding: "16px",
  },
}))

const Dashboard = () => {
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
          <Typography variant="h5">Katha Utsav Evaluation Portal</Typography>
          <Button className={classes.logout} onClick={logoutClick}>Logout</Button>
        </ToolBar>        
      </AppBar>
      <Grid style={{margin:"0 0 10px 80px"}}>
        <Typography variant="h6">Dashboard (500)</Typography>
      </Grid>
      <Grid style={{margin:"0 0 10px 80px"}} container>
        <Grid item className={classes.tile}>
          <Paper className={classes.paper}>100 <br/><br/>Pending</Paper>
        </Grid>
        <Grid item className={classes.tile}>
          <Paper className={classes.paper}>100 <br/><br/>Approved</Paper>
        </Grid>
        <Grid item className={classes.tile}>
          <Paper className={classes.paper}>100 <br/><br/>Declined</Paper>
        </Grid>
      </Grid>
    </div>
  )
};

export default Dashboard;
