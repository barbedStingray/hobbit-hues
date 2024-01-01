
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
    const paints = useSelector((store) => store.setPaintsDropdown);
    const projectDetails = useSelector((store) => store.projectDetails);
    const techniqueList = useSelector((store) => store.techniqueList);

    const dispatch = useDispatch();

    let [paintProject, setPaintProject] = useState('#000000');
    let [technique, setTechnique] = useState('1');

    // hook for refresh
    const { id } = useParams();
    console.log(`useParams ID`, id);

    // loads details after page refresh
    function refreshDetails() {
        console.log(`refreshing details id:`, id);
        // fetch the project details
        dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: id });
    }
    // fetches paint dropdowns
    function fetchPaintsDropdown() {
        console.log(`getting paint dropdowns`);
        dispatch({ type: 'FETCH_PAINTS_DROPDOWN' });
    }
    // fetches technique dropdowns
    function fetchTechniqueDropdown() {
        console.log(`fetching techniques`);
        dispatch({ type: 'FETCH_TECHNIQUES_DROPDOWN' });
    }

    useEffect(() => {
        refreshDetails()
        fetchPaintsDropdown()
        fetchTechniqueDropdown()
    }, [id]);


    return (
        <div id='details-page'>

            <div id='details-header'>
                {projectDetails.map((project) =>
                    <h2>{project.model}</h2>
                )}
            </div>

            {JSON.stringify(paintProject)}
            {JSON.stringify(technique)}

            <div id='details-body'>

                <div id='color-view'>

                    <div id='projectImage-div'>
                        {projectDetails.map((project) =>
                            <img key={project.id} src={project.picture} alt="No Photo Uploaded" id='details-photo' />
                        )}

                        <div>
                            {projectDetails.map((project) =>
                                <p key={project.id}>{project.description}</p>
                            )}
                        </div>

                    </div>


                    {/* <div>
                        {projectDetails.map((project) =>
                            <h2>{project.primary}</h2>
                        )}
                    </div> */}

                    <div className='detail-palette'>
                        {/* Project Color Display */}
                        <div className="palette-container">
                            <div className="detailThird primary-twolight"><p>Light</p></div>
                            <div className="detailSecond primary-light"><p>Light</p></div>
                            <div className="detailPrime primary"><p>Primary</p></div>
                            <div className="detailSecond primary-dark"><p>Dark</p></div>
                            <div className="detailThird primary-twodark"><p>Dark</p></div>
                        </div>
                        <div className="palette-container">
                            <div className="detailThird primary-triad-2"><p>Triad 2</p></div>
                            <div className="detailSecond primary-triad-1"><p>Triad 1</p></div>
                            <div className="detailPrime primary-complement"><p>Comp.</p></div>
                            <div className="detailSecond primary-analog-1"><p>Analog 1</p></div>
                            <div className="detailThird primary-analog-2"><p>Analog 2</p></div>
                        </div>
                    </div>

                </div>


                <div id='paint-labels'>

                    {/* add a new paint/technique */}
                    <div id='paint-inputs'>

                        <div>
                            <label><input
                                id='color-select'
                                type='color'
                                value={paintProject}
                                onChange={(e) => setPaintProject(e.target.value)}
                            >
                            </input></label>
                        </div>

                        <div id='paint-dropdowns'>

                            <p>Select New Paint</p>
                            <select
                                name='paints'
                                id='paint-dropdown'
                                onChange={((e) => setPaintProject(e.target.value, 'primary'))}
                            >
                                {paints.map((paint) =>
                                    <option value={paint.hexcode} key={paint.id}>{paint.paint}</option>
                                )}
                            </select>

                            <select
                                name='techniques'
                                id='technique-dropdown'
                                onChange={((e) => setTechnique(e.target.value))}
                            >
                                {techniqueList.map((technique) =>
                                    <option value={technique.id} key={technique.id}>{technique.technique}</option>
                                )}
                            </select>
                        </div>
                        <div id='add-paint'>
                            <button>Add Paint</button>
                        </div>

                    </div>

                    <div id='project-paints'>
                        <p>This is the Paint List</p>
                        {/* color box */}
                        {/* color name */}
                        {/* technique name */}
                    </div>

                </div>

            </div>




            {/* {JSON.stringify(projectDetails)} */}


        </div>
    );
}

export default ProjectDetails;
