
import React from 'react';
import { motion as m } from 'framer-motion';
import './ColorWheel.css';


function ColorWheel() {

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


      <m.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="colorWheel"
      >
        <m.div className={`tertiaryColor primary-twolight`} variants={item}><p>Light</p></m.div>
        <m.div className={`secondaryColor primary-light`} variants={item}><p>Light</p></m.div>
        <m.div className={`pirmaryColor primary`} variants={item}><p>Primary</p></m.div>
        <m.div className={`secondaryColor primary-dark`} variants={item}><p>Dark</p></m.div>
        <m.div className={`tertiaryColor primary-twodark`} variants={item}><p>Dark</p></m.div>
        <m.div className={`tertiaryColor primary-triad-2`} variants={item}><p>Triad 2</p></m.div>
        <m.div className={`secondaryColor primary-triad-1`} variants={item}><p>Triad 1</p></m.div>
        <m.div className={`pirmaryColor primary-complement`} variants={item}><p>Complement</p></m.div>
        <m.div className={`secondaryColor primary-analog-1`} variants={item}><p>Analog 1</p></m.div>
        <m.div className={`tertiaryColor primary-analog-2`} variants={item}><p>Analog 2</p></m.div>
      </m.div>
  );
}

export default ColorWheel;
