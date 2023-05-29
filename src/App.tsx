import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Authorization from "./Screens/Authorization/Authorization";
import Registration from "./Screens/Registration/Registration";
import Layout from "./Screens/Layout/Layout";
import Profile from "./Screens/Profile/Profile";
import Users from "./Screens/Users/Users";

export default function App() {
    useEffect(() => {
        (() => {
            if(!localStorage.getItem("token")) {
                localStorage.setItem("token", "");
            }
            localStorage.setItem("test", JSON.stringify({name: "test", surname: "test", patronymic:"test", age: 18, password: "testdata"}));
        })()
    }, [])
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Authorization />} />
            <Route path="/profile" element={<Layout content={<Profile id={"content"} /> } />} />
            <Route path="/users" element={<Layout content={<Users id={"content"}/>} />} />
            <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

