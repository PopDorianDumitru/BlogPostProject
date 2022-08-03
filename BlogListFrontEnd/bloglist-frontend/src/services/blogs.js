import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null;

const setToken = newToken=>{
  token = `Bearer ${newToken}`;
}
const createNewBlog = async(credentials)=>{
  const config = {
    headers: {Authorization: token},
  };
  const response = await axios.post(baseUrl, credentials, config);
  return response.data;
}

const updateBlog = async(blog,likeObject)=>{
  const response = await axios.put(`${baseUrl}/${blog.id}`, likeObject);
  return response.data;
}

const deleteBlog = async(blog)=>{
  const config = {
    headers: {authorization: token}
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`,config);
  return response.data;
}

export default { getAll, setToken, createNewBlog, updateBlog, deleteBlog }