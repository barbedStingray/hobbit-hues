
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProjectItem(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');

    const history = useHistory();
    const dispatch = useDispatch();










    function setColors(hue) {
        console.log(`hue:`, hue)
        // set your variable
        // if (inputType === 'primary') {
        //   setPalettePrime(H);
        // } else if (inputType === 'secondary') {
        //   setPaletteSecond(H);
        // } else {
        //   console.log(`palette exception`);
        // }
    
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











    function projectDetails(project) {

        console.log(`go to project details`);
        console.log(`project:`, project);
        console.log(`URL id:`, props.project.id);
        console.log(`TARGET HEXCODE FOR REDUCER:`, props.project.primary);


        // dispatch action to set details reducer
        // irrelevant with useParams
        // dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: props.project.id });

        // ! I think you can dispatch to your reducer here to set the hexcode of your project details.
        // setColors(props.project.priamry);
                // set a Reducer to enable the color palette,
                // dispatch({ type: 'SET_PRIMARY_HEXCODE', payload: props.project.primary });


        history.push(`/details/${props.project.id}`);

    }


    return (
        <div id='single-project' onClick={() => projectDetails(props.project)}>

            <div id='project-photo'>
                <img src={props.project.picture} alt="No Photo Uploaded" id='photo-project' />
            </div>

            <div id='project-words'>
                <div id='project-model'>
                    <h3>{props.project.model}</h3>
                </div>

                {/* <div id='project-primary'>
                    <p>{props.project.primary}</p>
                </div> */}

                <div id='project-description'>
                    <p>{props.project.description}</p>
                </div>

            </div>


        </div>
    );
}

export default ProjectItem;
