import React from 'react'
import '../styles/global.scss'
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography  from '@material-ui/core/Typography';
import axios from "axios";
import logo from '../client/assets/logo.png';
import logoutIcon from '../client/assets/logout.png';


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
  dashboardTitle:{
    width: '267px',
    height: '45px',    
    fontFamily: 'Poppins',
    fontSize: '30px',
    lineHeight: '45px',
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
  gridContainer:{
    flexGrow: 1,
  },
  tile:{
    marginRight: '25px'
  },
  status:{
    width: '85px',
    height: '33.78px',
    left: '134px',
    top: '205.71px',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '24px',
    letterSpacing: '0.01em',
    marginTop: '15px'
  },
  paper: {
    width: "12vw",
    height: "6vw",
    textAlign: "left",
    fontSize: "20px",
    fontWeight: "700",
    color: "black",
    padding: "16px",
    borderRadius: "10px"
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

  const totalCount = parseInt(props.pendingCount) + parseInt(props.approvedCount) + parseInt(props.declinedCount);

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

      <Grid style={{margin:"0 0 10px 100px"}}>
        <Typography className={classes.dashboardTitle}>Dashboard ({totalCount})</Typography>
      </Grid>
      <Grid style={{margin:"0 0 10px 100px", width: '90%'}} container>
        <Grid item className={classes.tile}>
          <Paper className={classes.paper}>
            <Typography className={classes.status}>{props.pendingCount}</Typography>
            <Typography style={{fontFamily: 'Poppins', fontSize:'18px'}}>PENDING</Typography>
          </Paper>
        </Grid>
        <Grid item className={classes.tile}>
        <Paper className={classes.paper}>
            <Typography className={classes.status}>{props.approvedCount}</Typography>
            <Typography>APPROVED</Typography>
          </Paper>
        </Grid>
        <Grid item className={classes.tile}>
        <Paper className={classes.paper}>
            <Typography className={classes.status}>{props.declinedCount}</Typography>
            <Typography>DECLINED</Typography>
        </Paper>
        </Grid>
      </Grid>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    pendingCount: state.statusCount.pendingStatusCount,
    approvedCount: state.statusCount.approvedStatusCount,
    declinedCount:state.statusCount.declinedStatusCount
  }
};

export default connect(mapStateToProps) (Dashboard);
