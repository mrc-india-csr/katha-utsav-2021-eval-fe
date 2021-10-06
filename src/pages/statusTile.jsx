import React from "react"
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography  from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dashboardTitle:{
    width: '267px',
    height: '45px',    
    fontFamily: 'Poppins',
    fontSize: '30px',
    lineHeight: '45px',
    letterSpacing: '0.01em'    
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
});

const StatusTile = (props) =>{
  const classes = useStyles();
  const totalCount = parseInt(props.pendingCount) + parseInt(props.approvedCount) + parseInt(props.declinedCount);

    return(
      <>
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
    </>
    )
}

const mapStateToProps = (state) => {
  return {
    pendingCount: state.statusCount.pendingStatusCount,
    approvedCount: state.statusCount.approvedStatusCount,
    declinedCount:state.statusCount.declinedStatusCount
  }
};

export default connect(mapStateToProps) (StatusTile);