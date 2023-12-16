import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function UserPage() {
  const user = useSelector((store) => store.user);

  // color variables
  let [primaryColor, setPrimaryColor] = useState('');

  function setHSL(Hex) {
    console.log('color conversion start');

    // convert to RGB
    let r = 0,
        g = 0,
        b = 0;
    console.log(`R G B:`, r, g, b);
    if (Hex.length == 4) {
      r = "0x" + Hex[1] + Hex[1];
      g = "0x" + Hex[2] + Hex[2];
      b = "0x" + Hex[3] + Hex[3];
    } else if (Hex.length == 7) {
      r = "0x" + Hex[1] + Hex[2];
      g = "0x" + Hex[3] + Hex[4];
      b = "0x" + Hex[5] + Hex[6];
    }
    console.log(`R G B:`, r, g, b);

    // convert to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    console.log(`R G B:`, r, g, b);

    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

        console.log(`cmin`, cmin);
        console.log(`cmax`, cmax);
        console.log(`delta`, delta);
        console.log(`H S L`, h, s, l);
  
        // defining H 
        if (delta == 0) {
          h = 0;
        } else if (cmax == r) {
          h = ((g - b) / delta) % 6;
        } else if (cmax == g) {
          h = ((g - b) / delta) + 2;
        } else {
          h = ((r - g) / delta) + 4;
        }
        console.log(`H S L`, h, s, l);

        h = Math.round(h * 60);

        if (h < 0) {
          h += 360;
        }

        console.log(`H S L`, h, s, l);

        // defining S L 
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        console.log(`H S L`, h, s, l);

        // conversions complete
        // set styles to root css H S L variables

  }


  return (
    <div>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>

      <div id='color-wheel'>
        <h3>Color Wheel Time</h3>

        <p>Primary Color Input</p>
        <input
          id='primary-color-input'
          type='color'
          onChange={(e) => setHSL(e.target.value)}
        >
        </input>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
