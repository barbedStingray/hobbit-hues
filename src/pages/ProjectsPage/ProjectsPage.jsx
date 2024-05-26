
// middleware
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
// components
import ProjectItem from '../../components/ProjectItem/ProjectItem.jsx';
// css
import './ProjectsPage.css';



function ProjectsPage() {

    const dispatch = useDispatch();
    const userProjects = useSelector((store) => store.userProjects);

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

            <p className='pageHeading'>My Miniatures</p>

            <div className='projectsDisplay'>
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
