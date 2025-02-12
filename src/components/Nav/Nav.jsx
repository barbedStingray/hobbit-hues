
// IMPORTS
// middleware
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// components
import LogOutButton from '../LogOutButton/LogOutButton';
// css
import './Nav.css';

// import { GiHobbitDwelling } from "react-icons/gi";




function Nav({ setCanEdit }) {

  const user = useSelector((store) => store.user);

  // const loggedInLinks = [
  //   {
  //     name: 'Colors',
  //     path: '/user'
  //   },
  //   {
  //     name: 'Projects',
  //     path: '/projects',
  //   },
  //   {
  //     name: 'Community',
  //     path: '/community',
  //   },
  //   {
  //     name: 'Tips',
  //     path: '/info'
  //   },
  // ];


  return (
    <div className="hobbitHeader">

      <Link to="/">
        <p className="headerTitle">Hobbit Hues</p>
        {/* <p className="headerTitle"><GiHobbitDwelling /></p> */}
      </Link>

      <div className='navBar'>
        {user.id ? (
          <>
            {/* LOGGED in, show these links */}
            <Link className="hobbitLink" to="/"><p>Colors</p></Link>
            <Link className="hobbitLink" to="/projects"><p onClick={() => setCanEdit(true)}>Projects</p></Link>
            <Link className="hobbitLink" to="/community"><p onClick={() => setCanEdit(false)}>Community</p></Link>
            <Link className="hobbitLink" to="/info"><p>Tips</p></Link>
            {/* {loggedInLinks.map((link) => (
              <Link className='hobbitLink' to={link.path}>
              {link.name}
              </Link>
              ))} */}
            <LogOutButton className="hobbitLink" />

          </>
        ) : (
          <>
            {/* NOT logged in, show these links */}
            <Link className="hobbitLink" to="/">Login / Register</Link>
            <Link className="hobbitLink" to="/about">About</Link>
          </>
        )}


      </div>
    </div >
  );
}

export default Nav;
