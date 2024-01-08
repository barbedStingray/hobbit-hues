
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
// components
import ProjectItem from '../ProjectItem/ProjectItem.jsx';
// css
import './ProjectsPage.css';



function ProjectsPage(props) {

    // middleware variables
    const dispatch = useDispatch();

    // redux variables
    const userProjects = useSelector((store) => store.userProjects);

    // variables
    const [heading, setHeading] = useState('Projects');
    // custom motion variable
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


    // page refresh
    function setProjectList() {
        dispatch({ type: 'FETCH_PROJECTS' });
    }
    useEffect(() => {
        setProjectList();
    }, []);





    return (

        <m.div
            key={'createMotionProjectsPage'}
            className="container"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.75, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
            id='projects-page'>

            <div id='project-heading'>
                <h2>{heading}</h2>
            </div>

            <div id='projects-display'>
                {userProjects.map((project) =>
                    (<ProjectItem
                        key={project.id}
                        project={project}
                    />))
                }
            </div>
        </m.div>

    );
}

export default ProjectsPage;
