import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteData from "../deleteData/DeleteData.tsx";
import './table.css'
// import { MDBDatatable } from 'mdb-react-ui-kit';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}
const headers = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "username", label: "User name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone no." },
  { key: "website", label: "Website" },
];

function Table() {
  const [userData, setUserData] = useState([]);
  const [userValue, setUserValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    loadUsersData();
  }, []);
  const loadUsersData = async () => {
    return await axios
      .get("http://localhost:3000/users")
      .then((getData) => setUserData(getData.data))
      .catch((err) => console.log(err));
  };

  const handleSort = async (e: { target: { value: string } }) => {
    const sortingValue = e.target.value;
    setSortValue(sortingValue);
    return await axios
      .get(`http://localhost:3000/users?_sort=${sortingValue}&_order=asc`)
      .then((getData) => setUserData(getData.data))
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    loadUsersData();
  };
  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:3000/users?q=${userValue}`)
      .then((getData) => {
        setUserData(getData.data);
        setUserValue("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex bg-light text-dark flex-column justify-content-center align-items-center vh-100">
      {/* <h1>List Of Players</h1> */}
      <div className="ft-1">
                            <h3><span>LIST </span>OF PLAYERS</h3>
                        </div>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex">
          <form className="d-flex input-group z-0 w-auto" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search name"
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-info">Search</button>
            <button onClick={() => handleReset()} className="btn btn-outline-dark">Reset</button>
          </form>
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-primary mb-3 me-3">
            Add Member
          </Link>
          <Link to="/" className="btn btn-primary mb-3">Back</Link>
        </div>
        <div className="table-wrapper">
        <table className="table">
          <thead className="table-dark text-center table-fixed">
            <tr>
              {headers.map((row) => {
                return <td key={row.key}>{row.label}</td>;
              })}
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
        </div>
        <h6>Sort Data By: </h6>
        <select
          style={{ width: "200px", height: "30px", borderRadius:"5px" }}
          onChange={handleSort}
          value={sortValue}
        >
          <option>Select value</option>
          {headers.map((item, index) => (
            <option value={item.key} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Table;
