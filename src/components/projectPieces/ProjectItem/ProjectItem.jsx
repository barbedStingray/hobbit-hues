
// IMPORTS
// middleware
import { useHistory } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// css
import './ProjectItem.css';

// scripts 
import goToProjectDetails from '../../../scripts/goToProjectDetails';



function ProjectItem({ project }) {

    // middleware variables
    const history = useHistory();

    console.log('project', project);
    // destructure
    const { description, id, model, picture } = project;

    // custom motion variable
    const singleProjectItem = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };


    
    return (

        <m.div
            key={'sigleMotionProject'}
            className="singleProjectItem"
            variants={singleProjectItem}
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
            onClick={() => goToProjectDetails(history, id)}>

            <img src={picture} alt="No Photo Uploaded" className='projectPagePhoto' />

        </m.div>
    );
}

export default ProjectItem;
