import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/table/Table";
import Create from "./components/create/Create";
import Update from "./components/update/Update";
import Read from "./components/read/Read";
import 'bootstrap/dist/css/bootstrap.min.css'
const LazyHome = React.lazy(()=>import("./components/home/Home")) // Improve Performance with Lazy Loading!


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<LazyHome />}></Route>
          {/* <Route path="/body" element = {<Body />}></Route> */}
          <Route path="/table" element = {<Table />}></Route>
          <Route path="/create" element = {<Create />}></Route>
          <Route path="/update/:id" element = {<Update />}></Route>
          <Route path="/read/:id" element = {<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
