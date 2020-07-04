import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'





const blogList = ({ blogs, updateBlog, user, deleteBlog }) => (




  <div>
    <br />
    <div id='blog'>
      {blogs.map(blog =>
        <div key={blog.id + blog.url}>

          <Blog key={blog.id} blog={blog}  />

          <Togglable buttonLabel='view' buttonCancel='hide'>
            <form onSubmit={updateBlog} id={blog.id} className='likeAdd'>
              <div >
                <div>On {blog.title} by {blog.author}</div>
                <div>{blog.url}</div>
                <div id='likesValue'>likes: {blog.likes}<button type='submit' id='likes'>like</button></div>
                <div>{blog.user.username}</div>


              </div>
            </form>
            {user.username === blog.user.username ?
              <form onSubmit={deleteBlog} id={blog.id}>
                <button type='submit' id='remove'>remove</button>
              </form> : ''}
          </Togglable>




        </div>
      )}
    </div>
  </div>

)


export default blogList