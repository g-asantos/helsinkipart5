import React from 'react'

const blogForm = ({
  createBlog,
  handleTitleChange,
  handleAuthorChange,
  handleURLChange }) => (
  <div>
    <div>
      <form onSubmit={createBlog}>
        <h2>create new</h2>
        <div>
            title
          <input type="text"  name='title' onChange={handleTitleChange} id='title' />
        </div>
        <div>
            author
          <input type="text"  name='author' onChange={handleAuthorChange} id='author' />
        </div>
        <div>
            url
          <input type="text" name='url' onChange={handleURLChange} id='url' />
        </div>
        <button type='submit' id='submit'>create</button>
      </form>
    </div>
  </div>
)


export default blogForm