import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  let [isCheck, setCheck] = useState(false);
  let toggleMenu = () => {
    setCheck(isCheck => !isCheck); // on,off 개념 boolean
  }
  const { pathname } = useLocation();
  useEffect(
    () => {
      setCheck(false);
      console.log(pathname);
    }, [pathname]
  );

  return (
    <div className="nav-container">
      <div className="logo w-30">
        <Link to="/" >
          BLOG
        </Link>
      </div>
      <ul className={isCheck ? "w-70 show-menu" : "w-70 hide-menu"}>
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input className="search" />
        </div>
        <li>
          <Link to="/" >
            Home
          </Link></li>
        <li>
          <Link to="/login" >
            login
          </Link>
        </li>
        <li>
          <Link to="/mypage" >
            mypage
          </Link>
        </li>
        <li>
          <Link to="/post" >
            post
          </Link>
        </li>
        <li>
          <Link to="/list" >
            List
          </Link>
        </li>

      </ul>
      <button className="toggle-btn" onClick={toggleMenu}><FontAwesomeIcon icon={faBars} /></button>
    </div>
  )
}

export default Navbar;
