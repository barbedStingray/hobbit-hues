import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'
import './minisPage.css'


function MinisPage() {

    const [openFilter, setOpenFilter] = useState(false)

    const [theme, setTheme] = useState('starWars')
    const [realm, setRealm] = useState('mordor')
    const [allMinis, setAllMinis] = useState([])

    useEffect(() => {
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
                <div key={mini.id} className='placeholder'>
                    <div className='mini-image'>
                        <img className='mini-picture' src={mini.picture} />
                    </div>
                    <div className='mini-info'>
                        <p>{mini.model}</p>
                        <p>{mini.rank}</p>
                        <p>on display</p>
                    </div>
                    <button className='mini-edit'>Edit</button>
                </div>
                )}
            </div>

            <motion.div
                className="filter-menu"
                onClick={() => setOpenFilter(!openFilter)}
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
                <button>X</button>


            </motion.div>




        </div>

    )
}

export default MinisPage
