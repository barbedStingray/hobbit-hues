import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorWheel from '../../components/ColorWheel/ColorWheel.jsx';
import './hobbitHues.css';


import setColors from '../../components/setColors.js'
import fetchPaints from '../../components/customHooks/fetchPaints.js';

const HobbitHues = () => {

    const navigate = useNavigate()
    const [palettePrime, setPalettePrime] = useState('#0056d6') // initial paint
    const { paintList, isLoaded, detailStatus } = fetchPaints()

    return (
        <div className="hobbitHues-home">

            <p className='pageHeading'>Welcome!</p>

            <div className='colorSelector'>

                <div className='colorWheelContainer'>
                    <ColorWheel />
                </div>
                
                <div className='colorInputs'>
                    <label><input
                        className='colorSelect'
                        type='color'
                        value={palettePrime}
                        onChange={(e) => setColors(e.target.value, setPalettePrime)}
                    ></input></label>

                    <select
                        name='paints'
                        className='paintSelectBox'
                        onChange={(e) => setColors(e.target.value, setPalettePrime)}
                    >
                        <option>Select Paint...</option>
                        {paintList.map((paint) =>
                            <option value={paint.hexcode} key={paint.id}>{paint.paint}</option>
                        )}
                    </select>

                    <input
                        className='selectHexcode'
                        type='text'
                        placeholder='#000000'
                        value={palettePrime}
                        onChange={(e) => setColors(e.target.value, setPalettePrime)}
                    ></input>
                </div>
            </div>

            <button onClick={() => navigate('/create')} className="btn">Create New Project</button>
        </div>
    )
}

export default HobbitHues;


