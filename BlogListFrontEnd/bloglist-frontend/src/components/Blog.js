import '../index.css'
import { useState } from 'react'
const Blog = ({blog, handleLikingBlog, handleDeletingBlog, user}) =>{
  const [buttonLabel, setButtonLabel] = useState('view');
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [deleted, setDeleted] = useState(false);
  const toggleVisibility = (event)=> {
    event.preventDefault();
    setVisible(!visible)
    setButtonLabel(!visible? 'hide': 'view');
  };
  const showWhenVisible = {display: visible? '': 'none'};
  const handleLiking = ()=>{
    setLikes(likes + 1);
    handleLikingBlog(likes + 1);
  }
  const visibleWhenUser = {display: user.id === blog.user.id? '': 'none'};
  const hideWhenDeleted = {display: deleted? 'none': ''};
  const handleDeleting = ()=>{
    if(window.confirm(`Are you sure you want to delete the blog titled: ${blog.title}?`))
    {
      handleDeletingBlog();
      setDeleted(true);
    }
    
  }
  return (
    <div className="blog" style={hideWhenDeleted}>
      <div>{blog.title} {blog.author} <button onClick={toggleVisibility}> {buttonLabel} </button></div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes: {likes}  <button onClick={handleLiking}> like </button></p>
        <p>{blog.author}</p>
        
        <button onClick={handleDeleting} style={visibleWhenUser}> Remove </button>
      </div>
    </div>  
  )
} 

export default Blog