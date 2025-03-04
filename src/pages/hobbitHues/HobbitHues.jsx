import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorWheel from '../../components/ColorWheel/ColorWheel.jsx';
import './hobbitHues.css';
import setColorsTwo from '../../components/setColorsTwo.js'

import setColors from '../../components/setColors.js'
import fetchPaints from '../../components/customHooks/fetchPaints.js';

const HobbitHues = () => {

    const navigate = useNavigate()
    const [palettePrime, setPalettePrime] = useState('#0056d6') // initial paint
    const {
        textColor,
        compColor, 
        triadOne,
        triadTwo,
        analogOne,
        analogTwo,
        lightOne,
        lightTwo,
        darkOne,
        darkTwo,
    } = setColorsTwo(palettePrime)
    
    const { paintList, isLoaded, detailStatus } = fetchPaints()



    return (
        <div className="hobbitHues-home">

            <p className='pageHeading'>Welcome!</p>

            <div className='colorSelector'>

                <div className='colorWheelContainer'>
                    <div className="colorWheel">
                        <div className='colorColumn'>
                            <div className='swatch' style={{ background: lightTwo, color: textColor }}><p>javalite2</p></div>
                            <div className='swatch' style={{ background: lightOne, color: textColor }}><p>javalite</p></div>
                            <div className='swatch' style={{ background: palettePrime, color: textColor }}><p>JavaPrime</p></div>
                            <div className='swatch' style={{ background: darkOne, color: textColor }}><p>jdark</p></div>
                            <div className='swatch' style={{ background: darkTwo, color: textColor }}><p>jdark2</p></div>
                        </div>
                        <div className='colorColumn'>
                            <div className='swatch' style={{ background: triadTwo, color: textColor }}><p>Triad 2</p></div>
                            <div className='swatch' style={{ background: triadOne, color: textColor }}><p>Triad 1</p></div>
                            <div className='swatch' style={{ background: compColor, color: textColor }}><p>JavaComp</p></div>
                            <div className='swatch' style={{ background: analogOne, color: textColor }}><p>javalogOne</p></div>
                            <div className='swatch' style={{ background: analogTwo, color: textColor }}><p>javalog2</p></div>
                        </div>
                    </div>
                </div>

                <div className='colorInputs'>
                    <label><input
                        className='colorSelect'
                        type='color'
                        value={palettePrime}
                        onChange={(e) => setPalettePrime(e.target.value)}
                    ></input></label>

                    <select
                        name='paints'
                        className='paintSelectBox'
                        onChange={(e) => setPalettePrime(e.target.value)}
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
                        onChange={(e) => setPalettePrime(e.target.value)}
                    ></input>
                </div>
            </div>

            <button onClick={() => navigate('/create')} className="btn">Create New Project</button>
        </div>
    )
}

export default HobbitHues;