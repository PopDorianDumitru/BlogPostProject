import '../index.css'
import { useState } from "react";

const BlogForm = ({addBlog})=>{
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
   
    const handleNewBlog = async(event)=>{
        event.preventDefault();
          addBlog({
            author, title, url
          })
      }

    return(
        <div>
            <h1>Create New</h1>
            <form onSubmit={handleNewBlog}>
                <div>
                    title: <input type='text' value={title} onChange={({target})=>{setTitle(target.value)}}/>
                </div>
                <div>
                    author: <input type='text' value={author} onChange={({target})=>{setAuthor(target.value)}}/>
                </div>
                <div>
                    url: <input type='text' value={url} onChange={({target})=>{setUrl(target.value)}} />
                </div>
                <button type='submit'>Submit new blog</button>
            </form>
        </div>
    )
}

export default BlogForm;