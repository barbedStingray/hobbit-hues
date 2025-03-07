import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { motion } from 'framer-motion'
import { GiHobbitDwelling } from "react-icons/gi"



function Nav() {
  const [visible, setVisible] = useState(false);
  console.log('visible', visible)

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    hidden: {},
  }

  const linkVariants = {
    hidden: { opacity: 1, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 350, damping: 20 }
    }
  }

  return (
    <div className="hobbitHeader">

      <p className="headerIcon" onClick={() => setVisible(!visible)}><GiHobbitDwelling /></p>

      <motion.div
        className="nav-links"
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={linkVariants}>
          <Link className="hobbitLink" onClick={() => setVisible(!visible)} to="/"><p>Colors</p></Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link className="hobbitLink" onClick={() => setVisible(!visible)} to="/projects"><p>Projects</p></Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link className="hobbitLink" onClick={() => setVisible(!visible)} to="/create"><p>New</p></Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Nav