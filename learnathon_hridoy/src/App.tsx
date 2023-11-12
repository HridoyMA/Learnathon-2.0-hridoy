import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Create from "./components/create/Create";
import Update from "./components/update/Update";
import Read from "./components/read/Read";
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = { <Home /> }></Route>
          <Route path="/create" element = { <Create /> }></Route>
          <Route path="/update/:id" element = { <Update />}></Route>
          <Route path="/read/:id" element = { <Read />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
