
import React from 'react';
import ProjectsDisplay from '../../components/projectPieces/ProjectsDisplay/ProjectsDisplay';
import './ProjectsPage.css';


function PersonalProjects() {

    // todo logic to switch between community and projects... 

    return (
        <ProjectsDisplay
            fetchProjectsAction='FETCH_PROJECTS'
            selector={(store) => store.userProjects}
            heading='My Miniatures'
        />
    );
}

export default PersonalProjects;
