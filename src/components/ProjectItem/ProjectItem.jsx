
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProjectItem(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');


    function projectDetails() {
        console.log(`go to project details`);

    }


    return (
        <div id='single-project' onClick={projectDetails}>

            <div id='project-photo'>
                <img src={props.project.picture} alt="No Photo Uploaded" id='photo-project' />
            </div>

            <div id='project-words'>
                <div id='project-model'>
                    <h3>{props.project.model}</h3>
                </div>

                {/* <div id='project-primary'>
                    <p>{props.project.primary}</p>
                </div> */}

                <div id='project-description'>
                    <p>{props.project.description}</p>
                </div>

            </div>


        </div>
    );
}

export default ProjectItem;
