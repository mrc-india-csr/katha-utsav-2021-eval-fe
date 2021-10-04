import React, {useState} from 'react';
import '../styles/login.scss';
import axios from "axios";
import logo from '../client/assets/logo.png';

const Auth = () => {
  const [email, setEmail] = useState('');
  const loginSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/login', {email}).then((res) => {
      window.location = res.data.redirect;
    }).catch((e) => {
      console.log(e)
    });
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
                setEmail(event.target.value)
              }} type='email'
                value={email}
                placeholder="Email ID"
                className="emailInput"
              />
            </div>
          <br/>
          <div>
            <button type='submit' className="loginButton">Login</button>
          </div>		  
        </form>
        </div>
    </div>
  );
}

export default Auth;
