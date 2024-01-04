
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* fetchProjectDetails(action) {
    try {
      // project results data
        const detailResults = yield axios.get(`/api/user/details/${action.payload}`);
        console.log(`detailResults`, detailResults.data);

      // project paints data
        const detailPaintResults = yield axios.get(`/api/user/detailPaints/${action.payload}`);
        console.log(`detailPaintResults.data`, detailPaintResults.data);

        // dispatch action to set the reducer for general details
        yield put({ type: 'SET_PROJECT_DETAILS', payload: detailResults.data });
        yield put({ type: 'SET_PAINT_DETAILS', payload: detailPaintResults.data });



        function setColors (hue) {
          console.log(`BEGIN SET COLORS hue:`, hue)
          // conversion portion start
          // hex to rgb
          let r = 0, g = 0, b = 0;
          if (hue.length == 4) {
            r = "0x" + hue[1] + hue[1];
            g = "0x" + hue[2] + hue[2];
            b = "0x" + hue[3] + hue[3];
          } else if (hue.length == 7) {
            r = "0x" + hue[1] + hue[2];
            g = "0x" + hue[3] + hue[4];
            b = "0x" + hue[5] + hue[6];
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
  
      
          document.documentElement.style.setProperty(`--primary-color-h`, h);
          document.documentElement.style.setProperty(`--primary-color-s`, s + '%');
          document.documentElement.style.setProperty(`--primary-color-l`, l + '%');
        }
        // set color wheel
        setColors(detailResults.data.primary);

  

    } catch (error) {
      console.log(`error in GET /details/:id`);
      alert(`something went wrong with the details!`);
    }
  }

  function* detailsSaga() {
    yield takeLatest('FETCH_PROJECT_DETAILS', fetchProjectDetails);
  }

  
  export default detailsSaga;
