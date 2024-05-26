
// middleware
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
// components
import ProjectItem from '../ProjectItem/ProjectItem.jsx';
// css
// import './ProjectsDisplay.css';
import './ProjectsDisplay.jsx';



function ProjectsDisplay({ fetchProjectsAction, selector, heading }) {

    const dispatch = useDispatch();
    const projects = useSelector(selector);

    useEffect(() => {
        // setProjectList();
        dispatch({ type: fetchProjectsAction });
    }, [dispatch, fetchProjectsAction]);
    
    
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.15,
                staggerChildren: 0.05
            }
        }
    };

    return (

        <m.div
            key={'createMotionProjectsPage'}
            className="projectsPage"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.55, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
        >

            <p className='pageHeading'>{heading}</p>

            <div className='projectsDisplay'>
                {projects.map((project) =>
                (<ProjectItem
                    key={project.id}
                    project={project}
                />))
                }
            </div>

        </m.div>

    );
}

export default ProjectsDisplay;
