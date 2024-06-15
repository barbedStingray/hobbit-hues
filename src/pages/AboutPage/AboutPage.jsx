
// IMPORTS
// middleware
import React from 'react';


import './AboutPage.css';
import { AnimatePresence, motion as m } from 'framer-motion';


function AboutPage() {

  const techUsed = [
    'React',
    'Cloudinary',
    'Framer Motion',
    'Passport',
    'Javascript',
    'PostgreSQL',
    'Redux',
    'Axios'
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // scale: 1,
      transition: {
        // duration: 2.5,
        delayChildren: 2.4,
        staggerChildren: 2.25
      }
    }
  };


  return (
    <AnimatePresence mode='wait'>
      <m.div
        key={'createMotionAbout'}

        className="aboutPage"
        variants={container}
        initial="hidden"
        transition={{ duration: 2.55, ease: 'easeOut' }}
        animate="visible"
        exit={{
          opacity: 0,
          transition: { duration: 2 }
        }}
      >

        <h1 className='pageHeading'>About Hobbit Hues</h1>

        <div className='aboutBody'>
          <div className='aboutText'>
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

          <div className='techUsed'>
            <h4>Tech Used</h4>
            {techUsed.map((tech, i) => (
              <p key={i}>{tech}</p>
            ))}
          </div>
        </div>

      </m.div>
    </AnimatePresence>
  );
}

export default AboutPage;
