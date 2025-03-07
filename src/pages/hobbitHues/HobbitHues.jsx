import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hobbitHues.css';
import fetchPaints from '../../components/customHooks/fetchPaints.js';

import { motion, useSpring, useMotionValue } from "framer-motion";
import RYBcolors from '../../Images/RYBcolors.png'
import schemeMap from '../../components/schemeMap.js';


const HobbitHues = () => {

    const navigate = useNavigate()

    const rotate = useSpring(0, { mass: 1, stiffness: 100, damping: 10 })
    const handleRotate = (e, i) => {
        // e.preventDefault()
        rotate.set(rotate.get() + (i.delta.x + i.delta.y) * 4.5); // Adjust the factor to control speed
    }

    // const schemeArray = ['complimentary', 'splitComp', 'analogous', 'square', 'triad']
    const [scheme, setScheme] = useState('complimentary')
    const selectSchemes = Object.keys(schemeMap)

    return (
        <div className="hobbitHues-home">

            <p className='pageHeading'>Hobbit Hues</p>

            <select className='select-scheme' onChange={(e) => setScheme(e.target.value)}>
                {selectSchemes.map((line, i) => (
                    <option value={line} key={i}>{line}</option>
                ))}
            </select>

            <div className='colorWheel-container'>
                <motion.div
                    className="rotating-box"
                    style={{ rotate: rotate }}
                    onPan={handleRotate}
                >
                    {schemeMap[scheme]}
                </motion.div>
            </div>

        </div>
    )
}

export default HobbitHues;