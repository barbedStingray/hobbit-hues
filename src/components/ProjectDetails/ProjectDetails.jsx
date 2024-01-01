
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProjectDetails(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const projectDetails = useSelector((store) => store.projectDetails);

    const dispatch = useDispatch();

    // hook for refresh
    const { id } = useParams();
    console.log(`useParams ID`, id);

    function refreshDetails() {
        console.log(`refreshing details id:`, id);
        // fetch the project details
        dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: id });
    }
    useEffect(() => {
        refreshDetails()
    }, [id]);


    return (
        <div id='details-page'>

            <div id='details-header'>
                {projectDetails.map((project) =>
                    <h2>{project.model}</h2>
                )}
            </div>

            <div>
                {projectDetails.map((project) =>
                    <img src={project.picture} alt="No Photo Uploaded" id='details-photo' />
                )}
            </div>

            <div>
                {projectDetails.map((project) =>
                    <h2>{project.primary}</h2>
                )}
            </div>

            <div>
                {projectDetails.map((project) =>
                    <h2>{project.description}</h2>
                )}
            </div>

            <div id='left-colors' className='side-colors'>
                {/* Primary Color Display */}
                <div className="shape-container">
                    <div className="divTertiary primary-triad-2"><p>Triad 2</p></div>
                    <div className="divSecondary primary-triad-1"><p>Triad 1</p></div>
                    <div className="divPrime primary-complement"><p>Complement</p></div>
                    <div className="divSecondary primary-analog-1"><p>Analog 1</p></div>
                    <div className="divTertiary primary-analog-2"><p>Analog 2</p></div>
                </div>
                <div className="shape-container">
                    <div className="divTertiary primary-twolight"><p>Light</p></div>
                    <div className="divSecondary primary-light"><p>Light</p></div>
                    <div className="divPrime primary"><p>Primary</p></div>
                    <div className="divSecondary primary-dark"><p>Dark</p></div>
                    <div className="divTertiary primary-twodark"><p>Dark</p></div>
                </div>
            </div>


            {/* {JSON.stringify(projectDetails)} */}


        </div>
    );
}

export default ProjectDetails;
