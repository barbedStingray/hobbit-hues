
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

  // Function - toggle login and register boxes
  const loginOrRegister = (event) => {
    setLogin(!login);
  };

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

      className="container"
      variants={container}
      initial="hidden"
      transition={{ duration: 0.75, ease: 'easeOut' }}
      animate="visible"
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5 }
    }}
      id='landing-page'>

      <div id='title-hobbit'><h2>Hobbit Hues</h2></div>


      <div id='login-boxes'>

        <div>
          <div className={login ? 'visible' : 'invisible'}>
            <LoginForm />
          </div>

          <div className={login ? 'invisible' : 'visible'}>
            <RegisterForm />
          </div>

          <div className={login ? 'visible' : 'invisible'}>
            <button className="btn" onClick={loginOrRegister}>
              Register
            </button>
          </div>

          <div className={login ? 'invisible' : 'visible'}>
            <button className="btn" onClick={loginOrRegister}>
              Login
            </button>
          </div>
        </div>

      </div>
    </m.div>
  );
}

export default LandingPage;


