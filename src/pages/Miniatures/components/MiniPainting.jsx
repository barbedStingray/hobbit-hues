import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MiniPainting = ({ mini }) => {

    const [isExpanded, setIsExpanded] = useState(false)


    return (
        <div key={mini.id} className='mini-painting'>
            <div className='mini-minimize'>
                <div className='mini-image'>
                    <img className='mini-picture' src={mini.picture} />
                </div>
                <div className='mini-info'>
                    <p>{mini.model}</p>
                    <p>{mini.rank}</p>
                    <p>on display</p>
                </div>
                <button className='mini-expand' onClick={() => setIsExpanded(!isExpanded)}>Expand</button>
            </div>
            {/* {isExpanded && ( */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        className='mini-maximize'
                        key={isExpanded ? 'mini-expand' : 'mini-collapse'}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }} 
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p>Colors</p>
                        <p>Colors</p>
                        <p>Colors</p>
                        <p>Colors</p>
                        <p>Colors</p>
                        <p>Colors</p>
                        <p>Colors</p>
                        <p>Colors</p>
                    </motion.div>
                </AnimatePresence>

            {/* )} */}
        </div>
    )
}

export default MiniPainting
