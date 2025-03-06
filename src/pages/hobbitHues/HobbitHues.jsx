import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorWheel from '../../components/ColorWheel/ColorWheel.jsx';
import './hobbitHues.css';
import setColorsTwo from '../../components/setColorsTwo.js'
import setRybColors from '../../components/setRybColors.js'
import setColors from '../../components/setColors.js'
import fetchPaints from '../../components/customHooks/fetchPaints.js';

import { motion, useSpring, useMotionValue } from "framer-motion";
import RYBcolors from '../../Images/RYBcolors.png'


const HobbitHues = () => {

    const navigate = useNavigate()
    const [palettePrime, setPalettePrime] = useState('#D94393') // initial paint
    const {
        textColor,
        colorOne,
        colorTwo,
        colorThree,
        colorFour,
        colorFive,
    } = setColorsTwo(palettePrime, 'complimentary')

    const { paintList, isLoaded, detailStatus } = fetchPaints()

    const [rybCompColor, setRybCompColor] = useState(setRybColors('#FF0000'))
    console.log('rybCompColor', rybCompColor)


    const rotate = useSpring(0, { mass: 1, stiffness: 100, damping: 10 });
    const handleRotate = (e, i) => {
        rotate.set(rotate.get() + (i.delta.x + i.delta.y) * 2.5); // Adjust the factor to control speed
    };




    return (
        <div className="hobbitHues-home">

            <p className='pageHeading'>Welcome!</p>

            <div className='colorSelector'>

                <div className='colorWheelContainer'>

                    <motion.div
                        className="rotating-box"
                        style={{ rotate: rotate }}
                        onPan={handleRotate}
                    >
                        <div className='line'></div>
                        <div className="analog analog-1"></div>
                        <div className="analog analog-2"></div>
                        <div className="analog analog-3"></div>
                    </motion.div>
                    <img className='color-wheel' src={RYBcolors} />




                </div>



                {/* <div className="colorWheel">
                        <div className='colorColumn'>
                            <div className='swatch bgTestTwo'><p>two</p></div>
                            <div className='swatch bgTestOne'><p>one</p></div>
                            <div className='swatch bgTestPrime'><p>prime</p></div>
                            <div className='swatch bgTestThree'><p>three</p></div>
                            <div className='swatch bgTestFour'><p>four</p></div>
                            <div className='swatch bgTestShade'><p>shade</p></div>
                        </div>
                        <div className='colorColumn'>
                            <div className='swatch' style={{ background: colorTwo }}><p>c-two</p></div>
                            <div className='swatch' style={{ background: colorOne }}><p>c-one</p></div>
                            <div className='swatch' style={{ background: palettePrime }}><p>C-prime</p></div>
                            <div className='swatch' style={{ background: colorThree }}><p>c-three</p></div>
                            <div className='swatch' style={{ background: colorFour }}><p>c-four</p></div>
                            <div className='swatch' style={{ background: colorFive }}><p>C-shade</p></div>
                        </div>
                        <div className='colorColumn'>
                            <div className='swatch' style={{ background: palettePrime }}><p>prime</p></div>
                            <div className='swatch' style={{ background: rybCompColor }}><p>ryb-comp</p></div>
                        </div>
                    </div> */}




                {/* <div className='colorInputs'>
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
                </div> */}
            </div>

            <button onClick={() => navigate('/create')} className="btn">Create New Project</button>
        </div>
    )
}

export default HobbitHues;