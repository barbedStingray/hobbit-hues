
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// components
// import ImageUpload from '../ImageUpload/ImageUpload.jsx';
import CommunityPaint from '../CommunityPaint/CommunityPaint.jsx';
// import SelectTechnique from '../SelectTechnique/SelectTechnique.jsx';
// // todo import ButtonB from '../ButtonB/ButtonB.jsx';
//css
// import './ProjectDetails.css';



function CommunityDetails() {

    // reducer information
    const store = useSelector((store) => store);
    const projectDetails = useSelector((store) => store.projectDetails); // list of projects details
    const paintDetails = useSelector((store) => store.paintDetails); // list of paint details for project

    // middleware functions
    const dispatch = useDispatch();
    const { id } = useParams(); // hook for refresh

    // custom motion Variables
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            // scale: 1,
            transition: {
                // duration: 2,
                delayChildren: 0.25,
                staggerChildren: 0.1
            }
        }
    };
    const mainPhotoCommunityMotion = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };


    // ** Functions ****************

    // pageReload functions if ID changes
    useEffect(() => {
        refreshDetails()
    }, [id]);

    // page refresh function
    function refreshDetails() {
        dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: id });
    }
    



    return (

        <m.div
            key={'createMotionCommunityDetails'}
            className="container"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.55, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
            id='details-page'>

            <div id='details-header'>
                <h2>{projectDetails.model}</h2>
            </div>

            <div id='details-body'>

                {/* page left display */}
                <div id='color-view'>

                    <div id='project-mainDescription'>
                            <p key={projectDetails.id}>{projectDetails.description}</p>
                    </div>

                    <div id='projectImage-div'>
                            <m.img
                                key={'motionMainCommunityPhoto'}
                                variants={mainPhotoCommunityMotion}
                                src={projectDetails.picture}
                                alt="No Photo Uploaded"
                                className='detailsPhoto mainPhotoMotion' 
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.5 }
                                }}
                
                                />
                    </div>

                    <div id='detail-palette'>
                        {/* Project Color Display */}
                        <div className="palette-container">
                            <div className="detailThird primary-triad-2 "><p>T2</p></div>
                            <div className="detailSecond primary-triad-1 "><p>T1</p></div>
                            <div className="detailPrime primary-complement "><p>Comp.</p></div>
                            <div className="detailSecond primary-analog-1 "><p>A1</p></div>
                            <div className="detailThird primary-analog-2 "><p>A2</p></div>
                        </div>
                        <div className="palette-container">
                            <div className="detailThird primary-twolight"><p>Light</p></div>
                            <div className="detailSecond primary-light"><p>Light</p></div>
                            <div className="detailPrime primary"><p>Prime</p></div>
                            <div className="detailSecond primary-dark"><p>Dark</p></div>
                            <div className="detailThird primary-twodark"><p>Dark</p></div>
                        </div>
                    </div>
                </div>

                {/* begin the details item list  */}
                <div id='painted-models'>
                    {paintDetails.map((paint) =>
                        <CommunityPaint paint={paint} refreshDetails={refreshDetails} />
                    )}
                </div>

            </div>
        </m.div>
    );
}

export default CommunityDetails;
