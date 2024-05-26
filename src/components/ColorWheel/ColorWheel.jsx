
import React from 'react';
import { motion as m } from 'framer-motion';
import './ColorWheel.css';


function ColorWheel({ color }) {

  // Custom animation variables
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.06
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
      variants={container}
      initial="hidden"
      animate="visible"
      className="colorWheel"
    >
      <div className='colorColumnPrime'>
        <m.div className={`tertiaryColor ${color}-twolight`} variants={item}><p>Light</p></m.div>
        <m.div className={`secondaryColor ${color}-light`} variants={item}><p>Light</p></m.div>
        <m.div className={`pirmaryColor ${color}`} variants={item}><p>{color}</p></m.div>
        <m.div className={`secondaryColor ${color}-dark`} variants={item}><p>Dark</p></m.div>
        <m.div className={`tertiaryColor ${color}-twodark`} variants={item}><p>Dark</p></m.div>
      </div>
      <div className='colorColumnSecondary'>
        <m.div className={`tertiaryColor ${color}-triad-2`} variants={item}><p>Triad 2</p></m.div>
        <m.div className={`secondaryColor ${color}-triad-1`} variants={item}><p>Triad 1</p></m.div>
        <m.div className={`pirmaryColor ${color}-complement`} variants={item}><p>Complement</p></m.div>
        <m.div className={`secondaryColor ${color}-analog-1`} variants={item}><p>Analog 1</p></m.div>
        <m.div className={`tertiaryColor ${color}-analog-2`} variants={item}><p>Analog 2</p></m.div>
      </div>

    </m.div>
  );
}

export default ColorWheel;
