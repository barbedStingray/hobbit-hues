import { Link } from 'react-router-dom'
import './Nav.css'
import { GiHobbitDwelling } from "react-icons/gi"



function Nav() {

  return (
    <div className="hobbitHeader">

      <Link className="headerIcon" to='/'><GiHobbitDwelling /></Link>

      <div className="nav-links">
          <Link className="hobbitLink" to="/create"><p>Create</p></Link>
          <Link className="hobbitLink" to="/data"><p>Data</p></Link>
          <Link className="hobbitLink" to="/minis"><p>Minis</p></Link>
      </div>
    </div>
  )
}

export default Nav