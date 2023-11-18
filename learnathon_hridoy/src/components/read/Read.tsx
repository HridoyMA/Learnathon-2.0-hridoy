import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface User {
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

function Read() {

  const [userData, setUserData] = useState([]);
  const { id } = useParams(); // useParams hook will fetch the id from URL

  useEffect(()=>{
    loadUsersData();
  },[]
  )
  const loadUsersData =async () => {
    return await axios //wait until data will fetch
    .get('http://localhost:3000/users/'+ id) // get the data based on id
    .then(getData => setUserData(getData.data))
    .catch(err => console.log(err));
  }

  return (
    <div className="d-flex bg-light text-dark flex-column justify-content-center align-items-center vh-100 w-100">
      <div className="w-25 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3 className="text-center mb-4">Detail of User</h3>
        <div className="mb-3">
          <strong>Name: { userData.name }</strong>
        </div>
        <div className="mb-3">
          <strong>Username: { userData.username }</strong>
        </div>
        <div className="mb-3">
          <strong>Email: { userData.email }</strong>
        </div>
        <div className="mb-3">
          <strong>Phone: { userData.phone }</strong>
        </div>
        <div className="mb-4">
          <strong>Website: { userData.website }</strong>
        </div>
        <div className="text-center">
        <Link to={`/update/${id}`} className="btn btn-outline-success me-3">Edit</Link>
        <Link to={`/`} className="btn btn-outline-primary me-3">Back</Link>
        </div>
      </div>
    </div>
  )
}

export default Read
