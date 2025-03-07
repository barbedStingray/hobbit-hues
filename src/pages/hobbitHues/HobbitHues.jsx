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
        rotate.set(rotate.get() + (i.delta.x + i.delta.y) * 2.5); // Adjust the factor to control speed
    }

    // const schemeArray = ['complimentary', 'splitComp', 'analogous', 'square', 'triad']
    const schemeArray = ['splitComp', '', '', '', '']



    return (
        <div className="hobbitHues-home">

            <p className='pageHeading'>Welcome!</p>

            <div className='colorWheel-container'>
                <motion.div
                    className="rotating-box"
                    style={{ rotate: rotate }}
                    onPan={handleRotate}
                >
                    {schemeArray.map(scheme => schemeMap[scheme])}
                </motion.div>
            </div>

            <button onClick={() => navigate('/create')} className="btn">Create New Project</button>
        </div>
    )
}

export default HobbitHues;