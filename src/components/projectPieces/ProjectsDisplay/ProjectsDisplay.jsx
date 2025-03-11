
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
    
    
    return (

        <m.div className="projectsPage">

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
