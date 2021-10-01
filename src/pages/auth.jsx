import React, {useState} from 'react';
import '../styles/global.scss';
import axios from "axios";

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
    <form onSubmit={loginSubmit}>
      <div>
        <label htmlFor='email-input' defaultValue='Email'>Email: </label>
        <input
          name='email' onChange={(event) => {
          setEmail(event.target.value)
        }} type='email'
          value={email}
        />
      </div>
      <br/>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
}

export default Auth;
