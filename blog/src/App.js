import "./App.scss";
import Post from "./route/Post";
import List from "./route/List";
import Navbar from "./route/Navbar";
import LogIn from "./route/LogIn";
import Mypage from "./route/Mypage";

import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <List />
          }
        />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/post" element={<Post />} />
        <Route path="/list" element={<List />} />
      </Routes >
    </div >
  );
}

function HTML() {
  return (<div className="div"><Outlet></Outlet></div>
  )
}
export default App;
