
// IMPORTS
// middleware
import React from 'react';


import './AboutPage.css';
import ImageUpload from '../ImageUpload/ImageUpload.jsx';
import { AnimatePresence, motion as m } from 'framer-motion';




function AboutPage() {



  const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        // scale: 1,
        transition: {
            // duration: 2,
            delayChildren: 0.4,
            staggerChildren: 0.25
        }
    }
};


  return (

      <m.div
        key={'createMotionAbout'}

        className="container"
        variants={container}
        initial="hidden"
        transition={{ duration: 0.55, ease: 'easeOut' }}
        animate="visible"
        exit={{ 
          opacity: 0,
          transition: { duration: 0.5 }
      }}
    
        id='about-pageDiv'
      >


        <h1>About Hobbit Hues</h1>


        <div>
          <p>Check it out! My first hosted application! Very excited to present this and have it available for use.</p>
          <p>
            This project represents an insight to the passions that I have explored and put forth a significant amount of time
            and effort to enjoy throughout my lifetime.

          </p>
          <p>
            The theme of the project is credited to Hobbiton out in New Zealand. I was fortunate enough to spend a month touring the
            country, although admittedly never made it to the south island because I was having so much fun on the north one.
            The photos used in this project are ones that I took myself at the actual Hobbiton location and are displayed agian
            below again to appreciate without any interference.
          </p>
          <p>
            I began painting in 9th grade '2006' after the Lord of the Rings trilogy had finished. I had a great time painting all the
            little foot soldiers and monsters from LotR that I never gave it up, and... 15 years later I am still painting and would
            like to say i've learned a few things along the way.
          </p>
        </div>

      </m.div>
  );
}

export default AboutPage;
