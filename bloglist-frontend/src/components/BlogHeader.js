import React from 'react'
import Notification from './Notification'
import Error from './Error'


const BlogHeader = ({ error,success,user,logout }) => (

  <div>
    <h2>blogs</h2>
    <Notification message={success} />
    <Error message={error} />
    <div>{user.username} logged in <button onClick={logout}>logout</button></div>
  </div>
)






export default BlogHeader