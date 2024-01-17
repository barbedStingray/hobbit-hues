
// IMPORTS
// middleware
import React from 'react';


import './AboutPage.css';
import { motion as m } from 'framer-motion';


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

      <div id='about-header'>
        <h1>About Hobbit Hues</h1>
      </div>

      <div id='about-body'>
      <div id='about-text'>
        <p>Hello!</p>
        <p>
          Check it out! My first hosted application! Very excited to make this available for use.
          Thank you to Prime Digital Academy, my Taaffeite Cohort, and Chris Black (instructor) for providing the tools to create something incredible!
        </p>
        <p>
          If you, as a mini-model enthusiast, have an interest in viewing your improvement or sharing 
          your models with others, then this is a great app for you to use! It is beginner friendly, easy to use, and provides you 
          with a little bit of color theory to start you off in your painting. 
        </p>
      </div>

      <div id='tech-div'>
        <p id='center'>Tech Used</p>
        <ul>
          <li>React</li>
          <li>Cloudinary</li>
          <li>Framer Motion</li>
          <li>Passport</li>
          <li>Javascript</li>
          <li>PostgreSQL</li>
          <li>Sagas</li>
          <li>Redux</li>
          <li>Axios</li>
          <li>CSS Flexbox</li>
        </ul>

      </div>
      </div>

    </m.div>
  );
}

export default AboutPage;
