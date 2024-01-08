
// IMPORTS
// middleware
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motion as m, AnimatePresence } from 'framer-motion';
// components
import LogOutButton from '../LogOutButton/LogOutButton';
import ColorWheel from '../ColorWheel/ColorWheel.jsx';
// css
import './UserPage.css';

// function UserPage() {
const UserPage = ({ showComponent }) => {

  // middleware variables
  const dispatch = useDispatch();
  const history = useHistory();

  // redux variables
  const user = useSelector((store) => store.user);
  const paints = useSelector((store) => store.setPaintsDropdown);

  // variables
  let [palettePrime, setPalettePrime] = useState('#0056d6');
  let [paletteSecond, setPaletteSecond] = useState('#77bb41');



  // ** Functions ************

  // page load and refresh
  useEffect(() => {
    fetchPaintsDropdown();
  }, []);

  // generate paint dropdown menus
  function fetchPaintsDropdown() {
    // console.log(`getting paint dropdowns`);
    dispatch({ type: 'FETCH_PAINTS_DROPDOWN' });
  }

  // button for a new project
  function createNewProject() {
    // console.log(`creating new project`);
    dispatch({ type: 'SET_PRIMARY_HEXCODE', payload: palettePrime });
    // path to form page
    history.push('/create');
  }

  // function to convert hex => hsl and then assign HSL to css variable
  function setColors(H, inputType) {

    // set your variable
    if (inputType === 'primary') {
      setPalettePrime(H);
    } else if (inputType === 'secondary') {
      setPaletteSecond(H);
    } else {
      console.log(`palette exception`);
    }

    // conversion portion start
    // hex to rgb
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // rgb to hsl
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0)
      h = 0;

    else if (cmax == r)
      h = ((g - b) / delta) % 6;

    else if (cmax == g)
      h = (b - r) / delta + 2;

    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    // s + l
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    document.documentElement.style.setProperty(`--${inputType}-color-h`, h);
    document.documentElement.style.setProperty(`--${inputType}-color-s`, s + '%');
    document.documentElement.style.setProperty(`--${inputType}-color-l`, l + '%');
  }




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
      key={'createMotionUser'}

      className="container"
      variants={container}
      initial="hidden"
      transition={{ duration: 0.55, ease: 'easeOut' }}
      animate="visible"
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5 }
    }}

      // initial={{ x: '-100%' }}
      // animate={{ x: '0%' }}
      // transition={{ duration: 0.75, ease: 'easeOut' }}
      // exit={{ x: '100%' }}


      id='user-page'>

      {/* {JSON.stringify(paints)} */}

      {/* <ColorWheel 
        setPalettePrime={setPalettePrime}
        setPaletteSecond={setPaletteSecond}
      /> */}


      <ColorWheel
        color={'primary'}
      />


      <div id='titleinputs-form'>

        <div id='title-inputs'>
          {/* page title */}
          <div id='title-colors'>
            {/* <h2>Color Wheel</h2> */}
            <h2>Welcome {user.username}!</h2>

            {/* <h2>Prancing Palette</h2> */}
          </div>


          {/* primary/secondary inputs */}
          <div className='color-input'>

            <div id='color-input-buttons'>

              <label>Primary<br /><input
                className='color-select'
                type='color'
                value={palettePrime}
                onChange={(e) => setColors(e.target.value, 'primary')}
              >
              </input></label>

              <select
                name='paints'
                className='selectBox'
                onChange={((e) => setColors(e.target.value, 'primary'))}
              >
                {paints.map((paint) =>
                  <option value={paint.hexcode} key={paint.id}>{paint.paint}</option>
                )}
              </select>

              <input
                className='selectHex'
                type='text'
                value={palettePrime}
                onChange={(e) => setColors(e.target.value, 'primary')}
              >
              </input>

            </div>

            <div id='color-input-buttons'>

              <label>Secondary<br /><input
                className='color-select'
                type='color'
                value={paletteSecond}
                onChange={(e) => setColors(e.target.value, 'secondary')}
              >
              </input></label>

              <select
                name='paints'
                className='selectBox'
                onChange={((e) => setColors(e.target.value, 'secondary'))}
              >
                {paints.map((paint) =>
                  <option value={paint.hexcode} key={paint.id}>{paint.paint}</option>
                )}
              </select>

              <input
                className='selectHex'
                type='text'
                value={paletteSecond}
                onChange={(e) => setColors(e.target.value, 'secondary')}
              >
              </input>

            </div>

          </div>
        </div>

        <div id='newProject-button'>
          {/* new project button */}
          <button onClick={createNewProject} className="btn">Create New Project</button>
        </div>


      </div>

      <ColorWheel
        color={'secondary'}
      />

    </m.div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


