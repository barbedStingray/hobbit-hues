
// IMPORTS
// middleware
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// css
import './ProjectItem.css';



function ProjectItem(props) {

    // middleware variables
    const history = useHistory();

    // custom motion variable
    const singleProjectItem = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    // takes user to project details page
    function projectDetails(project) {
        history.push(`/details/${props.project.id}`);
    }



    return (

        <m.div
            key={'sigleMotionProject'}
            className="singleProjectItem"
            variants={singleProjectItem}
            id='single-project'
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}

            onClick={() => projectDetails(props.project)}>

            <div id='project-photo'>
                <img src={props.project.picture} alt="No Photo Uploaded" className='photo-project' />
            </div>

            <div id='project-words'>
                <div id='project-model'>
                    <h3>{props.project.model}</h3>
                </div>

                <div id='project-description'>
                    <p>{props.project.description}</p>
                </div>
            </div>
        </m.div>
    );
}

export default ProjectItem;
