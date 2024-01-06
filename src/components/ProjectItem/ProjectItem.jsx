
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './ProjectItem.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProjectItem(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');

    const history = useHistory();
    const dispatch = useDispatch();



    function projectDetails(project) {

        console.log(`go to project details`);
        console.log(`project:`, project);
        console.log(`URL id:`, props.project.id);

        history.push(`/details/${props.project.id}`);

    }


    return (
        <div id='single-project' onClick={() => projectDetails(props.project)}>

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


        </div>
    );
}

export default ProjectItem;
