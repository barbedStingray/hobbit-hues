
// IMPORTS
// middleware
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// components
import LogOutButton from '../LogOutButton/LogOutButton';
// css
import './Nav.css';



function Nav() {

  // redux variable
  const user = useSelector((store) => store.user);


  return (
    <div className="nav">
      <Link to="/home">
        <h3 className="nav-title ringbearer">Hobbit Hues</h3>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/home">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Colors
            </Link>

            <Link className="navLink" to="/projects">
              Projects
            </Link>

            <Link className="navLink" to="/community">
              Community
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
