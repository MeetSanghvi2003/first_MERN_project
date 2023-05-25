import { FC } from "react";
import "./Components/css/App.css";
import "./Components/css/forms.css";
import "./Components/css/animation.css";
import Register from "./Components/Pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Login";
import Protected from "./Components/Pages/Protected";
import Home from "./Components/Pages/Home";
import AddNotes from "./Components/Pages/AddNotes";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/addnotes"
            element={<Protected Component={AddNotes} />}
          ></Route>
          <Route path="/home" element={<Protected Component={Home} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
