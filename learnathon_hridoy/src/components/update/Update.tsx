import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

function Update() {

  const [updateUserData, setUpdateUserData] = useState({
    name: '',
    username: '',
    email:'',
    phone:'',
    website:''
  })

  // const [userData, setUserData] = useState([]);
  const { id } = useParams(); // useParams hook will fetch the id from URL

  useEffect(()=>{
    loadUsersData();
  },[])
  
  const loadUsersData =async () => {
    return await axios //wait until data will fetch
    .get('http://localhost:3000/users/'+ id) // get the data based on id
    .then(getData => setUpdateUserData(getData.data))
    .catch(err => console.log(err));
  }

  const navigate = useNavigate();
  
  const handleUpdate = (event: { preventDefault: () => void; }) =>
  {
    event.preventDefault();
    axios.put('http://localhost:3000/users/'+id, updateUserData)
    .then(() => {
      // console.log(getData);
      navigate('/')
    })
    .catch(err => console.log(err));
  }
  return (
    <div className=" d-flex justify-content-center align-items-center w-100 vh-100 bg-secondary">
    <div className="w-25 border bg-white shadow px-5 pt-3 pb-5 rounded">
      <h1 className="text-center">Update user data</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label htmlFor="name">Name:</label>
          <input value= { updateUserData.name } type="text" placeholder="Enter Name" className="form-control" name="name"
          onChange={ data => setUpdateUserData({...updateUserData, name: data.target.value})}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="username">User Name:</label>
          <input value={ updateUserData.username } type="text" placeholder="Enter User Name" className="form-control" name="username"
          onChange={ data => setUpdateUserData({...updateUserData, username: data.target.value})}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email:</label>
          <input value={ updateUserData.email } type="email" placeholder="Enter Email" className="form-control" name="email"
          onChange={ data => setUpdateUserData({...updateUserData, email: data.target.value})}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone">Phone:</label>
          <input value={ updateUserData.phone } type="text" placeholder="Enter Phone Number" className="form-control" name="phone"
          onChange={ data => setUpdateUserData({...updateUserData, phone: data.target.value})}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="website">Website:</label>
          <input value={ updateUserData.website } type="text" placeholder="Enter Website" className="form-control" name="website"
          onChange={ data => setUpdateUserData({...updateUserData, website: data.target.value})}
          />
        </div>
        <div className="text-center">
        <button className="btn btn-success">Update</button>
        <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Update
