
// IMPORTS
// middleware
import React, { useState } from 'react';
import { motion as m } from 'framer-motion';

// css
import './LandingPage.css';

// components
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm.jsx';


function LandingPage() {

  // variables
  const [login, setLogin] = useState(true); // toggle for login display


  // custom motion variable
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // scale: 1,
      transition: {
        // duration: 2,
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };




  return (
    <m.div
      key={'/home'}

      className="landingPage"
      variants={container}
      initial="hidden"
      transition={{ duration: 0.75, ease: 'easeOut' }}
      animate="visible"
      exit={{
        opacity: 0,
        transition: { duration: 0.5 }
      }}
    >

      <p className='pageHeading'>Hobbit Hues</p>

      <div className='registerOrLogin'>
        {login ? (
          <>
            <LoginForm />
            <button className="btn" onClick={() => setLogin(!login)}>Register</button>
          </>
        ) : (
          <>
            <RegisterForm />
            <button className="btn" onClick={() => setLogin(!login)}>Login</button>
          </>
        )}
      </div>
    </m.div>
  );
}

export default LandingPage;


