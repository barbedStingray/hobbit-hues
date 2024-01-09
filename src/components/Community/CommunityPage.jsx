
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
// components
import CommunityItem from './CommunityItem/CommunityItem';
// css
import './CommunityPage.css';



function CommunityPage() {

    // middleware variables
    const dispatch = useDispatch();

    // redux variables
    const communityProjects = useSelector((store) => store.communityProjects);

    // variables
    const [heading, setHeading] = useState('Community');
    // custom motion variable
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.15,
                staggerChildren: 0.03
            }
        }
    };


    // page refresh
    function setCommunityList() {
        console.log(`setting the community list`);
        dispatch({ type: 'FETCH_COMMUNITY_PROJECTS' });
    }
    useEffect(() => {
        setCommunityList();
    }, []);




    return (

        <m.div
            key={'createMotionCommunityPage'}
            className="container"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.75, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
            id='community-page'>

                {/* {JSON.stringify(communityProjects)} */}

            <div id='community-heading'>
                <h2>{heading}</h2>
            </div>

            <div id='community-display'>
                {communityProjects.map((project) =>
                    (<CommunityItem
                        key={project.id}
                        project={project}
                    />))
                }
            </div>
        </m.div>

    );
}

export default CommunityPage;
