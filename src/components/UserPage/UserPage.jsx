import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import './UserPage.css';


function UserPage() {

  const user = useSelector((store) => store.user);
  const paints = useSelector((store) => store.setPaintsDropdown);
  const dispatch = useDispatch();

  let [palettePrime, setPalettePrime] = useState('#0056d6');
  let [paletteSecond, setPaletteSecond] = useState('#77bb41');

  // generate paint dropdown menus

  function fetchPaintsDropdown() {
    console.log(`getting paint dropdowns`);

    dispatch({ type: 'FETCH_PAINTS_DROPDOWN' });

    // console.log(`dispatch sent?`);
  }

  useEffect(() => {
    fetchPaintsDropdown();
  }, []);






  // BEGIN BENS CODE ****************

  // function setColors(Hex, colorInput) {
  //   console.log('color conversion start');
  //   console.log('hex', Hex);

  //   // convert to RGB
  //   let r = 0,
  //       g = 0,
  //       b = 0;
  //   console.log(`R G B:`, r, g, b);
  //   if (Hex.length == 4) {
  //     r = "0x" + Hex[1] + Hex[1];
  //     g = "0x" + Hex[2] + Hex[2];
  //     b = "0x" + Hex[3] + Hex[3];
  //   } else if (Hex.length == 7) {
  //     r = "0x" + Hex[1] + Hex[2];
  //     g = "0x" + Hex[3] + Hex[4];
  //     b = "0x" + Hex[5] + Hex[6];
  //   }
  //   console.log(`R G B:`, r, g, b);

  //   // convert to HSL
  //   r /= 255;
  //   g /= 255;
  //   b /= 255;
  //   console.log(`R G B:`, r, g, b);

  //   let cmin = Math.min(r,g,b),
  //       cmax = Math.max(r,g,b),
  //       delta = cmax - cmin,
  //       h = 0,
  //       s = 0,
  //       l = 0;

  //       console.log(`cmin`, cmin);
  //       console.log(`cmax`, cmax);
  //       console.log(`delta`, delta);
  //       console.log(`H S L`, h, s, l);

  //       // defining H 
  //       if (delta == 0) {
  //         h = 0;
  //       } else if (cmax == r) {
  //         h = ((g - b) / delta) % 6;
  //       } else if (cmax == g) {
  //         h = ((g - b) / delta) + 2;
  //       } else {
  //         h = ((r - g) / delta) + 4;
  //       }
  //       console.log(`H S L`, h, s, l);

  //       h = Math.round(h * 60);

  //       if (h < 0) {
  //         h += 360;
  //       }

  //       console.log(`H S L`, h, s, l);

  //       // defining S L 
  //       l = (cmax + cmin) / 2;
  //       s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  //       s = +(s * 100).toFixed(1);
  //       l = +(l * 100).toFixed(1);

  //       console.log(`H S L`, h, s, l);

  //       // conversions complete
  //       // set styles to root css H S L variables
  //       document.documentElement.style.setProperty(`--${colorInput}-color-h`, h);
  //       document.documentElement.style.setProperty(`--${colorInput}-color-s`, s + '%');
  //       document.documentElement.style.setProperty(`--${colorInput}-color-l`, l + '%');

  //       // document.documentElement.style.setProperty(`--${colorInput}-color`, `hsl(${h}, ${s}%, ${l}%)`);

  // }
  // END BENS CODE *****************

  function setColors(H, inputType) {

    // set your variable
    if (inputType === 'primary') {
      setPalettePrime(H);
    } else if (inputType === 'secondary') {
      setPaletteSecond(H);
    } else {
      console.log(`palette exception`);
    }

    // conversion start
    // Convert hex to RGB first
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
    // Then to HSL
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

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    document.documentElement.style.setProperty(`--${inputType}-color-h`, h);
    document.documentElement.style.setProperty(`--${inputType}-color-s`, s + '%');
    document.documentElement.style.setProperty(`--${inputType}-color-l`, l + '%');
  }

  function beginNewProject() {
    event.preventDefault();
    console.log(`starting new project`);
  }










  return (
    <div id='user-page'>

      {JSON.stringify(paints)}


      <div id='left-colors' className='side-colors'>
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
            <h2>Color Wheel</h2>
            {/* <h2>Prancing Palette</h2> */}
          </div>


          {/* primary/secondary inputs */}
          <div className='color-input'>

            <div id='color-input-primary'>

              <label>Primary<br /><input
                id='color-select'
                type='color'
                value={palettePrime}
                onChange={(e) => setColors(e.target.value, 'primary')}
              >
              </input></label>

              <select
                name='paints'
                id='paint-dropdown'
                onChange={((e) => setColors(e.target.value, 'primary'))}
              >
                <optgroup label='greyscale'>
                  <option value='#FFFFFF'>Skull White</option>
                  <option value='#000000'>Abaddon Black</option>
                </optgroup>
                <optgroup label='brown'>
                  <option value='#964B00'>Rhinox Hide</option>
                </optgroup>
              </select>

              <input
                className='input-color-hex'
                type='text'
                value={palettePrime}
                onChange={(e) => setColors(e.target.value, 'primary')}
              >
              </input>

            </div>

            <div id='color-input-secondary'>

              <label>Secondary<br /><input
                id='color-select'
                type='color'
                value={paletteSecond}
                onChange={(e) => setColors(e.target.value, 'secondary')}
              >
              </input></label>

              <select
                name='paints'
                id='paint-dropdown'
                onChange={((e) => setColors(e.target.value, 'secondary'))}
              >
                <optgroup label='greyscale'>
                  <option value='#FFFFFF'>Skull White</option>
                  <option value='#000000'>Abaddon Black</option>
                </optgroup>
                <optgroup label='brown'>
                  <option value='#964B00'>Rhinox Hide</option>
                </optgroup>
              </select>

              <input
                className='input-color-hex'
                type='text'
                value={paletteSecond}
                onChange={(e) => setColors(e.target.value, 'secondary')}
              >
              </input>

            </div>



          </div>
        </div>

        <div id='new-project'>
          {/* new project form */}
          <form
            className="newProject"
            onSubmit={beginNewProject}>

            <h3>Begin a New Project!</h3>
            {palettePrime}
            {paletteSecond}

            <div>
              <label htmlFor="model">
                Model:
                <input
                  type="text"
                  name="model"
                  placeholder='model name here...'
                  required
                // onChange={(event) => setUsername(event.target.value)}
                />
              </label>
            </div>

            <div>
              <input className="btn" type="submit" name="submit" value="Begin New Project" />
            </div>
          </form>

        </div>


      </div>

      <div id='right-colors' className='side-colors'>
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


      {/* <div className="container">
        <h3>Welcome, {user.username}!</h3>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
