
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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    // takes user to project details page
    function communityDetails(project) {
        console.log(`going to community Details page`)
        // history.push(`/details/${props.project.id}`);
    }



    return (

        <m.div

            key={'sigleMotionCommunityItem'}
            className="sigleMotionCommunityItem"
            variants={singleCommunityItem}
            id='single-communityProject'
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
