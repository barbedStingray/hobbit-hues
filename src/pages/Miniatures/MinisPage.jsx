import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import './minisPage.css'
import MiniPainting from './components/MiniPainting'


function MinisPage() {

    const [openFilter, setOpenFilter] = useState(false)

    const [paintQuality, setPaintQuality] = useState([10, 5])
    const [selectedRealms, setSelectedRealms] = useState(['rhun', 'kingdomHearts', 'jediOrder'])
    const realms = selectedRealms.length > 0 ? selectedRealms : null;
    const qualities = paintQuality.length > 0 ? paintQuality : null;

    const [allMinis, setAllMinis] = useState([])
    console.log('all Minis', allMinis)

    useEffect(() => {
        // todo use a custom hook with refresh key
        getAllMinis()
    }, [paintQuality, selectedRealms])

    const getAllMinis = async () => {
        // console.log('fetching all minis')

        try {
            const results = await axios.get('/api/user/allMinis', {
                params: { realms: realms, paint_quality: qualities}
            })
            setAllMinis(results.data)

        } catch (error) {
            console.log('error in fetching minis', error)
            // set statuses
        }
    }


    return (

        <div className="minis-page">

            <div className='minis-display'>
                {allMinis.map((mini) =>
                    <MiniPainting key={mini.id} mini={mini} />
                )}
            </div>





            <motion.div
                className="filter-menu"
                animate={{
                    // Animations for expansion and centering
                    width: openFilter ? '35dvw' : '80px',
                    height: openFilter ? '60dvh' : '80px',
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                }}
            >
                <button className='filter-button' onClick={() => setOpenFilter(!openFilter)}>X</button>

                <div className='filter-content'>

                </div>


            </motion.div>




        </div>

    )
}

export default MinisPage
