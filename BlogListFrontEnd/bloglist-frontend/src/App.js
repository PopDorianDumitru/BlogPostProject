import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/users'
import './index.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useRef } from 'react'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  useEffect( ()=>{
   blogService.getAll().then(initialBlogs=> {setBlogs(initialBlogs)});
  },[]);

  useEffect( ()=>{
    try{
       const loguser = JSON.parse(window.localStorage.getItem('loggedInUser'));
      setUser(loguser);
      blogService.setToken(loguser.token);
    }
    catch(exception){

    }
   
  }, [])
  const blogFormRef = useRef();
  const handleLogin = async(event)=>{
    event.preventDefault();
    try{
      const loggedUser = await loginService.login({username, password})
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      setPassword('');
      setUsername('');
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedUser));
      setMessage(`User ${loggedUser.username} has logged on`);
      setMessageClass('success');
      setTimeout(()=>{
        setMessage(null);
        setMessageClass(null);
      }, 5000)
    }
    catch (exception){
      setMessage(`Username or password is incorrect`);
      setMessageClass('error');
      setTimeout(()=>{
        setMessage(null);
        setMessageClass(null);
      }, 5000)
      console.log(exception);
    }
  }
  const handleLogout = async(event)=>{
    event.preventDefault();
    setUser(null);
    setPassword('');
    setUsername('');
    window.localStorage.removeItem('loggedInUser');
  }
  const loginForm = ()=>{
    const hideWhenVisible = {display: loginVisible? 'none': ''}
    const showWhenVisible = {display: loginVisible? '' : 'none'};

    return (
      <div>
        <div style={hideWhenVisible}>
        <button onClick={()=>{setLoginVisible(true)}}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm username={username} password={password} handlePasswordChange={({target})=>{setPassword(target.value)}} 
            handleSubmit={handleLogin} handleUsernameChange={({target})=>{setUsername(target.value)}}
          />
          <button onClick={()=> {setLoginVisible(false)}}>cancel</button>
        </div>
      </div>
      
    )
  }
  const blogList = ()=> {

    return (
      <div>
      {
        blogs.sort((a,b)=>(b.likes - a.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} handleLikingBlog={(likes)=>{blogService.updateBlog(blog, {likes})}}
          handleDeletingBlog={()=>{blogService.deleteBlog(blog)}} user={user} />)

      }
    </div>
    )
  }
  
  const addBlog = (newObject)=>{
    blogService.createNewBlog(newObject).then(returnedBlog=>{
      setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author? returnedBlog.author: 'unknown'} added`);
          setMessageClass('success');
          setTimeout(()=>{
            setMessage(null);
            setMessageClass(null);
          }, 5000)
      
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(returnedBlog))
    }).catch(()=>{
      setMessage(`You must add both the URL and the title of the blog`);
          setMessageClass('error');
          setTimeout(()=>{
            setMessage(null);
            setMessageClass(null);
          }, 5000)
    });
  }

  /*const handleNewBlog = async(event)=>{
    event.preventDefault();
    try{
      const newBlog = await blogService.createNewBlog({title, author, url});
      console.log(newBlog)
      setBlogs(blogs.concat([newBlog]));
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author? newBlog.author: 'unknown'} added`);
      setMessageClass('success');
      console.log(blogFormRef.current);
      blogFormRef.current.toggleVisibility();
      setTimeout(()=>{
        setMessage(null);
        setMessageClass(null);
      }, 5000)
    }
    catch(exception){
      setMessage(`You must add both the URL and the title of the blog`);
      setMessageClass('error');
      setTimeout(()=>{
        setMessage(null);
        setMessageClass(null);
      }, 5000)
    }
  }*/
  const newBlog = ()=>{
    return (
      <div>
        <Toggleable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Toggleable>
        
      </div>
    )
  }
  

  
  return (
    <div>
       <Notification message={message} messageClass={messageClass}/>
      {user ? 
      <div>
        <h2>blogs</h2>
        <h3>{user.username} logged in <button type='button' onClick={handleLogout}>Log out</button></h3>
        {newBlog()}
        {blogList()}
      </div>: loginForm()}
    </div>
  )
}

export default App
