import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteData from "../deleteData/DeleteData.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from '@fortawesome/free-solid-svg-icons'
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}
const headers = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'User name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone no.' },
  { key: 'website', label: 'Website' }
];





function Home() {
  const [userData, setUserData] = useState([]);
  const [userValue, setUserValue] = useState("");
  const [ sortValue, setSortValue] = useState("");


  const sortBy = ["id", "name", "email", "username", "phone", "website" ];

  useEffect(() => {
    loadUsersData();
  }, []);
  const loadUsersData = async () => {
    return await axios
      .get("http://localhost:3000/users")
      .then((getData) => setUserData(getData.data))
      .catch((err) => console.log(err));
  };


  const handleSort = async (e: { target: { value: string; }; }) => {
    const sortingValue = e.target.value;
    setSortValue(sortingValue)
    return await axios
    .get(`http://localhost:3000/users?_sort=${sortingValue}&_order=asc`)
    .then((getData) => setUserData(getData.data))
    .catch((err) => console.log(err));
  }

  const handleReset = () =>{
    loadUsersData();
  }
  const handleSearch = async (e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    return await axios
      .get(`http://localhost:3000/users?q=${userValue}`)
      .then((getData) => {setUserData(getData.data);
      setUserValue("");
      })
      .catch((err) => console.log(err));
  }


  return (
    <div className = "d-flex bg-light text-dark flex-column justify-content-center align-items-center vh-100">
      <h1>list of users</h1>
      <div className = "w-75 rounded bg-white border shadow p-4">
        <div className = "d-flex justify-content-start">
          <form className = "d-flex input-group w-auto" onSubmit={handleSearch}>
            <input type ="text" 
            className ="form-control"
            placeholder ="Search name"
            value = {userValue}
            onChange = {(e) => setUserValue(e.target.value)}
            />
            <button type="submit">Search</button>
            <button onClick={() => handleReset()}>Reset</button>
          </form>
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-primary mb-3">
            Add Member
          </Link>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              {headers.map((row) => {
                return <td key={row.key}>{row.label}</td>
              })

              }
              {/* <th>ID <FontAwesomeIcon icon={faSort}/></th>
              <th>Name <button value={"name"} onClick={()=>handleSort("name")}><FontAwesomeIcon icon={faSort}/></button></th>
              <th>UserName <FontAwesomeIcon icon={faSort}/></th>
              <th>Email <FontAwesomeIcon icon={faSort}/></th>
              <th>Phone <FontAwesomeIcon icon={faSort}/></th>
              <th>Website <FontAwesomeIcon icon={faSort}/></th> */}
              <th>Action</th>
            </tr>
          </thead>
            {userData.length === 0 ? (
              <tbody className="text-center">
              <tr>
                <td colSpan={8}>NO DATA FOUND</td>
              </tr>
               </tbody>
            ) : (
              userData.map((data: User, i) => (
                <tbody className="text-center">
                <tr key={i}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.website}</td>
                  <td>
                    <Link
                      to={`/read/${data.id}`}
                      className="btn btn-outline-success me-3"
                    >
                      Read
                    </Link>
                    {/* <Link to={`/update/${data.id}`}  className="btn btn-outline-success me-3">Update</Link> */}
                    <button
                      onClick={() => DeleteData(data.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
             </tbody>
              ))
            )}
        </table>
        <h6>Sort Data By: </h6>
        <select style={{ width:"200px", height: "30px" }}
        onChange={handleSort}
        value={sortValue}
        >
          <option>Select value</option>
          {
            sortBy.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

export default Home;
