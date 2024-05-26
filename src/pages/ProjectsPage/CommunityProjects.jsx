
import React from 'react';
import ProjectsDisplay from '../../components/projectPieces/ProjectsDisplay/ProjectsDisplay';
import './ProjectsPage.css';


function CommunityProjects() {


    return (
        <ProjectsDisplay
            fetchProjectsAction='FETCH_COMMUNITY_PROJECTS'
            selector={(store) => store.communityProjects}
            heading='Community'
        />
    );
}

export default CommunityProjects;
