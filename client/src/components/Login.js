import React, {useState} from "react";
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username:'',
    password:''
  })

  const handleChanges = event => {
    setCredentials({
      ...credentials,
      [event.target.name]:event.target.value
    })
  }

  const submitLogin = event => {
    event.preventDefault();
    console.log(credentials)
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(response => {
      console.log(response.data)
      localStorage.setItem('token', response.data.payload)
      props.history.push('/protected')
    })
  }
  


  return (
    <>
      <form onSubmit={submitLogin}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChanges}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChanges}
          placeholder="Password"
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
