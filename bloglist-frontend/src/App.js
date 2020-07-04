import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import BlogHeader from './components/BlogHeader'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [success, setSuccessMessage] = useState(null)
  const [error, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })



      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err){
      setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  const createBlog = async (e) => {
    e.preventDefault()
    BlogFormRef.current.toggleVisibility()
    try {
      let newBlog = {
        id: blogs.length,
        title: newTitle,
        author: newAuthor,
        likes: 0,
        url: newURL,
        token: user.token,
        user: user
      }
      await blogService.create(newBlog, user.token)
      let updatedBlogs = blogs.concat(newBlog)
      setNewAuthor('')
      setNewTitle('')
      setNewURL('')
      await setBlogs(updatedBlogs)
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlog = async(e) => {
    e.preventDefault()


    try {
      const blog = blogs.find(x => x.id === e.currentTarget.id)

      let newBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1
      }
      const id = e.currentTarget.id
      await blogService.update(newBlog, user.token, id)

      const modifiedBlogPosition = blogs.indexOf(blog)
      let newArrayBlog = blogs
      newArrayBlog[modifiedBlogPosition] = newBlog
      setBlogs(newArrayBlog)

    }catch(error){
      console.error(error)
    }
  }

  const deleteBlog = async(e) => {
    e.preventDefault()

    try {
      const blog = blogs.find(x => x.id === e.currentTarget.id)
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
        await blogService.remove(user.token, blog.id)
        let newBlogs = blogs
        const modifiedBlogPosition = newBlogs.indexOf(blog)
        newBlogs.splice(modifiedBlogPosition, 1)
        setBlogs(newBlogs)
        setSuccessMessage('a Blog was removed!')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)}
    } catch(error){
      console.error(error)
    }

  }



  const BlogFormRef = useRef()

  return (
    <div>


      {user === null ? <LoginForm handleLogin={handleLogin} handleUsernameChange={({ target }) => { setUsername(target.value) }}
        handlePasswordChange={({ target }) => { setPassword(target.value) }}
        username={username} password={password}
        success={success} error={error}
      /> :
        <div><BlogHeader user={user} error={error} success={success} logout={logout} />
          <Togglable buttonLabel='new blog' buttonCancel='cancel' ref={BlogFormRef}>
            <BlogForm createBlog={createBlog}
              handleTitleChange={({ target }) => { setNewTitle(target.value) }}
              handleAuthorChange={({ target }) => { setNewAuthor(target.value) }}
              handleURLChange={({ target }) => { setNewURL(target.value) }}
            /></Togglable>
          <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} /></div>}



    </div>
  )

}

export default App