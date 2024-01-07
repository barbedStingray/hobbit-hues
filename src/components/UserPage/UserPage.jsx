import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motion as m, AnimatePresence } from 'framer-motion';

import ColorWheel from '../ColorWheel/ColorWheel.jsx';

import './UserPage.css';

// function UserPage() {
const UserPage = ({ showComponent }) => {

  const user = useSelector((store) => store.user);
  const paints = useSelector((store) => store.setPaintsDropdown);
  const dispatch = useDispatch();
  const history = useHistory();

  let [palettePrime, setPalettePrime] = useState('#0056d6');
  let [paletteSecond, setPaletteSecond] = useState('#77bb41');

  // generate paint dropdown menus

  function fetchPaintsDropdown() {
    console.log(`getting paint dropdowns`);
    dispatch({ type: 'FETCH_PAINTS_DROPDOWN' });
  }

  useEffect(() => {
    fetchPaintsDropdown();
  }, []);






  // function to assign H S L to css variable
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


  // button for a new project
  function createNewProject() {
    console.log(`creating new project`);

    dispatch({ type: 'SET_PRIMARY_HEXCODE', payload: palettePrime });

    // path to form page
    history.push('/create');

  }






  return (
    <AnimatePresence
      // initial={false}
      mode={"wait"}
    >
      <m.div
        key='user'

        
        initial={{ y: '-100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        exit={{ opacity: 1 }}


        id='user-page'>

        {/* {JSON.stringify(paints)} */}

        {/* <ColorWheel 
        setPalettePrime={setPalettePrime}
        setPaletteSecond={setPaletteSecond}
      /> */}


        <div className='side-colors'>
          {/* Primary Color Display */}
          <div className="shape-container">
            <div className="divTertiary primary-triad-2"><p>Triad 2</p></div>
            <div className="divSecondary primary-triad-1"><p>Triad 1</p></div>
            <div className="divPrime primary-complement"><p>Complement</p></div>
            <div className="divSecondary primary-analog-1"><p>Analog 1</p></div>
            <div className="divTertiary primary-analog-2"><p>Analog 2</p></div>
          </div>
          <div className="shape-container">
            <div className="divTertiary primary-twolight"><p>Light</p></div>
            <div className="divSecondary primary-light"><p>Light</p></div>
            <div className="divPrime primary"><p>Primary</p></div>
            <div className="divSecondary primary-dark"><p>Dark</p></div>
            <div className="divTertiary primary-twodark"><p>Dark</p></div>
          </div>
        </div>

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

        <div className='side-colors'>
          {/* Secondary Color Display */}
          <div className="shape-container">
            <div className="divTertiary secondary-twolight"><p>Light +15</p></div>
            <div className="divSecondary secondary-light"><p>L +15</p></div>
            <div className="divPrime secondary"><p>Secondary</p></div>
            <div className="divSecondary secondary-dark"><p>L -15</p></div>
            <div className="divTertiary secondary-twodark"><p>Dark</p></div>
          </div>
          <div className="shape-container">
            <div className="divTertiary secondary-triad-2"><p>Triad 2</p></div>
            <div className="divSecondary secondary-triad-1"><p>Triad 1</p></div>
            <div className="divPrime secondary-complement"><p>Complement</p></div>
            <div className="divSecondary secondary-analog-1"><p>Analog 1</p></div>
            <div className="divTertiary secondary-analog-2"><p>Analog 2</p></div>
          </div>

        </div>


      </m.div>
    </AnimatePresence>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


