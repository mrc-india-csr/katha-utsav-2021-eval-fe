import React, {useState} from 'react';
import '../styles/login.scss';
import axios from "axios";
import logo from '../client/assets/logo.png';
import 'react-toastify/dist/ReactToastify.min.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [authError, setAuthError] = useState(false);
  const loginSubmit = async (event) => {
    event.preventDefault(); 
    await axios.post('/api/login', {email}).then((res) => {
      window.location = res.data.redirect;
    }).catch((e) => {
      setAuthError(true);
      console.log(e)
    });
  }
  const handleValidation = (emailID) =>{
    let emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailID);
    emailValid ? setIsValidEmail(true) : setIsValidEmail(false);
    if(authError){
      setAuthError(false);
    }    
    setEmail(emailID);
  }

  return (
    <div className="body">
      <div className="loginCard">
      <img src={logo} className="logo" /> 
          <span className="title"> Katha Utsav Evaluation Portal </span>
          <br/>
        <span className="subTitle">Enter your mail ID to login</span>  
        <br/><br/><br/>     
		    <form onSubmit={loginSubmit}>
          <div>
              <input
                name='email' onChange={(event) => {
                handleValidation(event.target.value)
              }} type='email'
                value={email}
                placeholder="Email ID"
                className="emailInput"
              />
            </div>
          <br/>
          <div>
            <button type='submit' className="loginButton" disabled={!isValidEmail}>Login</button>
          </div>		  
        </form>
        {
          (!isValidEmail)?
         <span className="validationError">Please login with your registered Mail ID</span>
         :null 
        }
        {
        (authError)?
         <span className="authError">The Email ID does not exist!</span>
         :null 
        }
        </div>
    </div>
  );
}

export default Auth;
