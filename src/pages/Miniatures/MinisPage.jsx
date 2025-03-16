import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'
import './minisPage.css'
import MiniPainting from './components/MiniPainting'


function MinisPage() {

    const [openFilter, setOpenFilter] = useState(false)

    const [theme, setTheme] = useState('')
    const [realm, setRealm] = useState('')
    const [allMinis, setAllMinis] = useState([])

    useEffect(() => {
        // todo use a custom hook with refresh key
        getAllMinis()
    }, [])

    const getAllMinis = async () => {
        // console.log('fetching all minis')

        try {
            const results = await axios.get('/api/user/allMinis', {
                params: {
                    theme: theme,
                    realm: realm,
                }
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
                    <MiniPainting mini={mini} />
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
