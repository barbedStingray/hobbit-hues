import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

// import { GiHobbitDwelling } from "react-icons/gi"


function Nav() {

  return (
    <div className="hobbitHeader">

      <Link to="/">
        <p className="headerTitle">Hobbit Hues</p>
        {/* <p className="headerTitle"><GiHobbitDwelling /></p> */}
      </Link>

      <div className='navBar'>
            {/* NOT logged in, show these links */}
            <Link className="hobbitLink" to="/"><p>Colors</p></Link>
            <Link className="hobbitLink" to="/projects"><p>Projects</p></Link>
            <Link className="hobbitLink" to="/about">About</Link>
            <Link className="hobbitLink" to="/info"><p>Info</p></Link>
      </div>
    </div >
  )
}

export default Nav
