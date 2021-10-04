import React, {useState} from 'react';
import '../styles/global.scss';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography  from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import logo from '../client/assets/logo.png';

const useStyles = makeStyles(theme => ({
  body:{
    backgroundColor: "#FFF5CA",
    position: "absolute",
    width: "99%",
    height:"98%"   
  },
  loginForm:{
    margin:"10% 30% 10% 30%",
    width: "500px",
    height: "200px",
    position:"relative",
    padding:"5vw"
  },
  loginButton:{
    color:"white",
    backgroundColor:"#98248D",
    width:"30vw",
    marginLeft: "25px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#9D4395"
  },
  },
  textfield:{
    width:"30vw",
    marginLeft: "25px"
  },
  logo:{
    marginRight:'25px',
    width: '50px',
    height: '50px',
    display:"inline"
  },
  title:{
    fontFamily: 'Poppins',
    fontSize: '30px',
    lineHeight: '45px',
    fontWeight: '400',
    letterSpacing: '0.01em',
    display:"inline"
  },
})
)
const Auth = () => {
  const [email, setEmail] = useState('');
  const classes = useStyles();
  const loginSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/login', {email}).then((res) => {
      window.location = res.data.redirect;
    }).catch((e) => {
      console.log(e)
    });
  }

  return (
    <div className={classes.body}>
      <Paper className={classes.loginForm}>       
      <Grid container>
        <Grid item>
      <img src={logo} className={classes.logo} /> 
      </Grid>
      <Grid item>
          <Typography className={classes.title}> Katha Utsav Evaluation Portal </Typography>
      </Grid>
      </Grid>
          <br/>
        <Typography align="center">Enter your mail ID to login</Typography>  
        <br/>
        <TextField 
        id="email" 
        variant="outlined" 
        label="Email ID" 
        className={classes.textfield}
        onChange={(event) => {
          setEmail(event.target.value)
        }}
        />
        <br/><br/>
        <Button className={classes.loginButton} onClick={loginSubmit}>Login</Button>
      </Paper>
    </div>
  );
}

export default Auth;
