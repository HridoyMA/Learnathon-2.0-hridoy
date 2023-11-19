import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

function Create() {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email:'',
    phone:'',
    website:''
  })
  
  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    axios.post('http://localhost:3000/users', userData)
    .then(() => {
      // console.log(getData);
      navigate('/table')
    })
    .catch(err => console.log(err));
  }
  return (
    <div className=" d-flex justify-content-center align-items-center w-100 vh-100 bg-secondary">
      <div className="w-25 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center">Add user data</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input type="text" placeholder="Enter Name" className="form-control" name="name"
            onChange={data => setUserData({...userData, name: data.target.value})}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">User Name:</label>
            <input type="text" placeholder="Enter User Name" className="form-control" name="username"
            onChange={data => setUserData({...userData, username: data.target.value})}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder="Enter Email" className="form-control" name="email"
            onChange={data => setUserData({...userData, email: data.target.value})}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone:</label>
            <input type="text" placeholder="Enter Phone Number" className="form-control" name="phone"
            onChange={data => setUserData({...userData, phone: data.target.value})}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="website">Website:</label>
            <input type="text" placeholder="Enter Website" className="form-control" name="website"
            onChange={data => setUserData({...userData, website: data.target.value})}
            />
          </div>
          <div className="text-center">
          <button className="btn btn-success">Submit</button>
          <Link to="/table" className="btn btn-primary ms-3">Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Create
