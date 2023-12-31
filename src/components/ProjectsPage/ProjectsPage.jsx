
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProjectsPage(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const userProjects = useSelector((store) => store.userProjects);
    const dispatch = useDispatch();

    const [heading, setHeading] = useState('This is the Projects Page');

    // load projects upon page refresh
    function setProjectList() {
        console.log(`setting projects`);
        // todo dispatch action
        dispatch({ type: 'FETCH_PROJECTS' });
    }
    useEffect(() => {
        setProjectList();
    }, []);

    

    return (
        <div id='projects-page'>
            <div>
                <h2>{heading}</h2>
            </div>

            <div id='projects-display'>
                <p>projects will be displayed here</p>
                {JSON.stringify(userProjects)}
            </div>
        </div>
    );
}

export default ProjectsPage;
