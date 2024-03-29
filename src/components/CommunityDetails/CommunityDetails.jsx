
// IMPORTS
// middleware
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// components
import CommunityPaint from '../CommunityPaint/CommunityPaint.jsx';
//css
import './CommunityDetails.css';



function CommunityDetails() {

    // reducer information
    // const store = useSelector((store) => store);
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
            scale: 1,
            transition: {
                duration: 0.5,
                delayChildren: 0.3,
                // staggerChildren: 1.0
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
        refreshDetails();

        // clears reducer
        return () => {
            dispatch({ type: 'RESET_PROJECT_DETAILS' });
        }
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
            id='communityDetails-page'>

            <div id='communityDetails-header'>
                <h2>{projectDetails.model}</h2>
            </div>

            <div id='communityDetails-body'>

                {/* page left display */}
                <div id='communityColor-view'>

                    <div id='projectImage-communityDiv'>
                        <m.img
                            key={'motionMainCommunitydetailsPhoto'}
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

                    <div id='community-palette'>
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

                <div id='community-mainDescription'>
                    <p key={projectDetails.id}>{projectDetails.description}</p>
                </div>


                {/* begin the details item list  */}
                <div id='community-models'>
                    {paintDetails.map((paint) =>
                        <CommunityPaint paint={paint} refreshDetails={refreshDetails} />
                    )}
                </div>

            </div>
        </m.div>
    );
}

export default CommunityDetails;
