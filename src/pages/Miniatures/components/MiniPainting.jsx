import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MiniPainting = ({ mini }) => {

    const [paintExpand, setPaintExpand] = useState(false)
    const [notesExpand, setNotesExpand] = useState(false)

    // console.log('MINI.paint', mini.paints)


    return (
        <div key={mini.id} className='mini-painting'>
            <div className='mini-minimize'>
                <div className='mini-image'>
                    {/* <img className='mini-picture' src={mini.picture} /> */}
                </div>
                <div className='mini-info'>
                    <p>{mini.model}</p>
                    <p>{mini.paint_quality}</p>
                    <p>on display</p>
                </div>
                <button className='mini-expand' onClick={() => setPaintExpand(!paintExpand)}>paintExpand</button>
                <button className='mini-expand' onClick={() => setNotesExpand(!notesExpand)}>notesExpand</button>
            </div>
                <AnimatePresence mode='wait'>
                    <motion.div
                        className='mini-maximize'
                        // key={paintExpand ? 'mini-expand' : 'mini-collapse'}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: paintExpand ? 'auto' : 0, opacity: paintExpand ? 1 : 0 }} 
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        {mini.paints.map((paint, i) => <p key={i}>{paint}</p>)}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode='wait'>
                    <motion.div
                        className='mini-maximize'
                        // key={paintExpand ? 'mini-expand' : 'mini-collapse'}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: notesExpand ? 'auto' : 0, opacity: notesExpand ? 1 : 0 }} 
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p>{mini.notes}</p>
                    </motion.div>
                </AnimatePresence>


        </div>
    )
}

export default MiniPainting
