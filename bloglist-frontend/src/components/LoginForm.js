import React from 'react'
import Notification from './Notification'
import Error from './Error'


const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  success,
  error
}) => {


  return (
    <form onSubmit={handleLogin}>
      <div>log in to application</div>
      <Notification message={success} />
      <Error message={error} />
      <div>
                username
        <input type="text" value={username} name='Username' onChange={handleUsernameChange} id='username' />
      </div>
      <div>
                password
        <input type="text" value={password} name='Password' onChange={handlePasswordChange} id='password' />
      </div>
      <button type='submit' id='login'>login</button>
    </form>
  )
}

export default LoginForm