
import React from 'react';
import { motion as m } from 'framer-motion';


function ColorWheel(props) {

// Custom animation variables
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.1
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

    <div className='side-colors'>

      <m.div
        variants={container}
        initial="hidden"
        animate="visible"

        className="shape-container">

        <m.div className={`item divTertiary ${props.color}-triad-2`} variants={item}><p>Triad 2</p></m.div>
        <m.div className={`item divSecondary ${props.color}-triad-1`} variants={item}><p>Triad 1</p></m.div>
        <m.div className={`item divPrime ${props.color}-complement`} variants={item}><p>Complement</p></m.div>
        <m.div className={`item divSecondary ${props.color}-analog-1`} variants={item}><p>Analog 1</p></m.div>
        <m.div className={`item divTertiary ${props.color}-analog-2`} variants={item}><p>Analog 2</p></m.div>
      </m.div>

      <m.div
        variants={container}
        initial="hidden"
        animate="visible"

        className="shape-container">

        <m.div className={`item divTertiary ${props.color}-twolight`} variants={item}><p>Light</p></m.div>
        <m.div className={`item divSecondary ${props.color}-light`} variants={item}><p>Light</p></m.div>
        <m.div className={`item divPrime ${props.color}`} variants={item}><p>Primary</p></m.div>
        <m.div className={`item divSecondary ${props.color}-dark`} variants={item}><p>Dark</p></m.div>
        <m.div className={`item divTertiary ${props.color}-twodark`} variants={item}><p>Dark</p></m.div>
      </m.div>
    </div>

  );
}

export default ColorWheel;
