import React from 'react';
import { motion as m } from 'framer-motion';
import './ModelDescription.css';

const ModelDescription = ({ picture, description }) => {

    const mainPhotoMotion = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    
    return (
        <div className='projectDetailsModel'>
            <m.img
                key={'motionMainPhoto'}
                variants={mainPhotoMotion}
                src={picture}
                alt="No Photo Uploaded"
                className='projectDetailsPicture'
            // exit={{
            //     opacity: 0,
            //     transition: { duration: 0.5 }
            // }}
            />
            <p className='projectDetailsModelDescription'>{description}</p>
        
        </div>
    )
}

export default ModelDescription
