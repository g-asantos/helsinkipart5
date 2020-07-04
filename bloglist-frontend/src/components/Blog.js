import React from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => (




  <div style={blogStyle} className='blog'>
    <div>
      {blog.title} {blog.author}

    </div>
  </div>
)

export default Blog
