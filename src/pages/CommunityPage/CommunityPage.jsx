
// IMPORTS
// middleware
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
import CommunityItem from '../../components/CommunityItem/CommunityItem';
// css
import './CommunityPage.css';

// scripts
import setCommunityList from '../../scripts/setCommunityList';




function CommunityPage() {

    const dispatch = useDispatch();
    const communityProjects = useSelector((store) => store.communityProjects);

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
    // function setCommunityList() {
    //     console.log(`setting the community list`);
    //     dispatch({ type: 'FETCH_COMMUNITY_PROJECTS' });
    // }
    useEffect(() => {
        // setCommunityList();
        setCommunityList(dispatch);
    }, []);




    return (

        <m.div
            key={'createMotionCommunityPage'}
            className="communityPage"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.75, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
        >
            <p className='pageHeading'>Community</p>

            <div className='communityDisplay'>
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
