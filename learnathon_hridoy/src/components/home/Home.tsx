import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  i: number;
}
function Home() {

  const [userData, setUserData] = useState([])

  useEffect(()=>{
    loadUsersData();
  },[]
  )
  const loadUsersData =async () => {
    return await axios
    .get('http://localhost:3000/users')
    .then(getData => setUserData(getData.data))
    .catch(err => console.log(err));
  }  
  const handleDelete = (id: number) =>{
    const confirm = window.confirm("Are you sure to Delete?");
    if(confirm)
    {
      axios.delete('http://localhost:3000/users/'+id)
      .then( () =>{
        location.reload(); // this will refresh the tab
      })
      .catch(error => console.log(error));
    }
  }

  return (
    <div className="d-flex bg-light text-dark flex-column justify-content-center align-items-center vh-100">
      <h1>list of users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-primary mb-3">Add Member</Link></div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              userData.map((data:User , i) => (
                <tr key={ i }>
                  <td>{ data.id }</td>
                  <td>{ data.name }</td>
                  <td>{ data.username }</td>
                  <td>{ data.email }</td>
                  <td>{ data.phone }</td>
                  <td>{ data.website }</td>
                  <td>
                    <Link to={`/read/${data.id}`} className="btn btn-outline-success me-3">Read</Link>
                    {/* <Link to={`/update/${data.id}`}  className="btn btn-outline-success me-3">Update</Link> */}
                    <button onClick={ () => handleDelete(data.id) } className="btn btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
