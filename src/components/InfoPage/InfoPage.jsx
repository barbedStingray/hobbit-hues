import React from 'react';
import { motion as m } from 'framer-motion';

import './InfoPage.css';


function InfoPage() {

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // scale: 1,
      transition: {
        delayChildren: 0.75,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };





  return (

    <m.div
      key={'createMotionInfo'}

      className="container"
      variants={container}
      initial="hidden"
      transition={{ duration: 0.55, ease: 'easeOut' }}
      animate="visible"
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5 }
    }}

      id='info-page'
    >
      <h1>Hobbit Hues Info</h1>

      <m.ul
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2, 3].map((index) => (
          <m.li key={index} className="item" variants={item} />
        ))}
      </m.ul>




    </m.div>
  );
}

export default InfoPage;
