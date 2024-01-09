
// IMPORTS
// middleware
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// css
import './CommunityItem.css';



function CommunityItem(props) {

    // middleware variables
    const history = useHistory();

    // custom motion variable
    const singleCommunityItem = {
        hidden: { opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    // takes user to project details page
    function communityDetails(project) {
        console.log(`going to community Details page`)
        console.log(`props.project.id`, props.project.id);
        console.log(`props.project.user_id`, props.project.user_id);
        console.log(`props.project`, props.project);
        history.push(`/communityDetail/${props.project.id}`);
    }



    return (

        <m.div
            key={'singleMotionCommunityItem'}
            className="singleMotionCommunityItem"
            variants={singleCommunityItem}
            id='single-communityProject'
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}

            onClick={() => communityDetails(props.project)}>

            <div id='community-model'>
                <h4 className='defaultMargin'>{props.project.model}</h4>
            </div>

            <div id='community-artist'>
                <h4 className='defaultMargin'>{props.project.username}</h4>
            </div>

            <div id='community-photo'>
                <img src={props.project.picture} alt="No Photo Uploaded" className='photo-communityProject' />
            </div>

        </m.div>
    );
}

export default CommunityItem;
