
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

// components
import ImageUpload from '../ImageUpload/ImageUpload.jsx';
import PaintDetails from '../PaintDetails/PaintDetails';



function ProjectDetails() {

    // reducer information
    const store = useSelector((store) => store);
    const paints = useSelector((store) => store.setPaintsDropdown);
    const projectDetails = useSelector((store) => store.projectDetails);
    const techniqueList = useSelector((store) => store.techniqueList);
    const paintDetails = useSelector((store) => store.paintDetails);

    // middleware functions
    const dispatch = useDispatch();
    const history = useHistory();

    // VARIABLES FOR PROJECT DETAILS
    const [paintProject, setPaintProject] = useState('#hexcode'); // POST new paint variable
    const [toggleProject, setToggleProject] = useState(true); // toggle for editing project details
    const { id } = useParams(); // hook for refresh
    // console.log(`useParams ID`, id);

    // variable to post a new paint
    let [newPaint, setNewPaint] = useState({
        project_id: id,
        paint_id: '38',
        technique_id: '1',
        photo: '',
        notes: ''
    });

    // new main photo display
    let [imagePath, setImagePath] = useState('');




    // function to set newPaint
    const newPaintChange = (key) => (event) => {
        console.log('changed newProject');
        setNewPaint({ ...newPaint, [key]: event.target.value });
    }
    // set new paint IMAGE FUNCTION
    function newPaintImage(newImage) {
        console.log(`adding the new paint image to the new paint variable`);
        setNewPaint({ ...newPaint, photo: newImage });
    }

    // function to submit new paint post
    function addNewPaint() {
        console.log(`adding new paint`);
        console.log(`newPaint object:`, newPaint);

        // dispatch to POST Saga
        dispatch({ type: 'POST_PROJECT_PAINT', payload: newPaint });

        // clear your inputs
        // setNewPaint({
        //     project_id: id,
        //     paint_id: '38',
        //     technique_id: '1',
        //     photo: '',
        //     notes: ''

        // });    
        refreshDetails();
        // setTimeout(refreshDetails(), 2000);
    }

    function setMultiple(benThought) {
        console.log(`setting multiple properties`);
        console.log(`benThought`, benThought);
        console.log(`benThought.paint_id.id`, benThought.paint_id.id);
        console.log(`benThought.paint_id.id`, benThought.paint_id.hexcode);
        setNewPaint({ ...newPaint, paint_id: benThought.paint_id.id });
        setPaintProject(benThought.paint_id.hexcode);
    }




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






    // ! delete project code 
    // delete entire project function
    function deleteProject(project) {
        console.log(`deleting the entire project - id:`, project);
        // dispatch the delete 
        dispatch({ type: 'DELETE_ENTIRE_PROJECT', payload: project });
        // navigate to /projects
        history.push('/projects');

    }




    // ! edit project code
    // toggles the Edit boxes appearances and propagates two buttons 'save' and 'cancel'
    function editProject() {
        console.log(`editing your project`);
        // toggle your edit boxes
        setToggleProject(!toggleProject);
        console.log(`toggle project:`, toggleProject);

        // set your delivery package
        setEditProjectPackage({
            id: id,
            description: `${projectDetails.description}`,
            picture: `${projectDetails.picture}`
        });
    }
    function cancelEdit() {
        setToggleProject(!toggleProject);
        setImagePath('');
    }

    // variable to update project image and description
    const [editProjectPackage, setEditProjectPackage] = useState({
        id: id,
        description: ``,
        picture: ''
    });
    // PUT request start for id, description, and picture
    function saveEdits() {
        console.log(`saving your new edits payload:`, editProjectPackage);
        // dispatch your new information
        dispatch({ type: 'UPDATE_PROJECT_DETAILS', payload: editProjectPackage });
        // refresh the page
        setTimeout(() => refreshDetails(), 250);
        setTimeout(() => setToggleProject(!toggleProject), 250);
    }
    // handles the description change
    const editProjectChange = (key) => (event) => {
        console.log('changed newProject');
        setEditProjectPackage({ ...editProjectPackage, [key]: event.target.value });
    }
    // prepares new picture for PUT request, props of ImageUpdate component
    function editProjectPicture(properties) {
        console.log(`properties`, properties)
        setEditProjectPackage({ ...editProjectPackage, picture: properties });
        setImagePath(properties);
        console.log(`imagePath`, imagePath);
    }








    return (
        <div id='details-page'>

            <div id='details-header'>
                <h2>{projectDetails.model}</h2>
            </div>

            {/* Project Details: <br /> {JSON.stringify(projectDetails)} */}
            {/* PAINT DETAILS: {JSON.stringify(paintDetails)} */}

            <div id='details-body'>

                <div id='color-view'>

                    <div id='project-mainDescription'>
                        {toggleProject === true ?

                            <p key={projectDetails.id}>{projectDetails.description}</p>
                            :
                            <textarea
                                onChange={editProjectChange('description')}
                                // ! this is the same as the createProject.css
                                id='createDescription-input'
                                value={editProjectPackage.description}
                            >
                            </textarea>
                        }
                    </div>


                    <div id='projectImage-div'>

                        {toggleProject === true ?
                            <img
                                key={projectDetails.id}
                                src={projectDetails.picture}
                                alt="No Photo Uploaded"
                                className='detailsPhoto' />
                            :
                            <>
                                <ImageUpload photoFunction={editProjectPicture} />
                                {
                                    imagePath === '' ? (
                                        <></>
                                    ) : (

                                        <div id='image-preview'>

                                            <img className='newMainUpload' src={imagePath} />
                                        </div>

                                    )

                                }
                            </>


                        }
                    </div>


                    <div id='detail-palette'>
                        {/* Project Color Display */}
                        <div className="palette-container">
                            <div className="detailThird primary-triad-2"><p>T2</p></div>
                            <div className="detailSecond primary-triad-1"><p>T1</p></div>
                            <div className="detailPrime primary-complement"><p>Comp.</p></div>
                            <div className="detailSecond primary-analog-1"><p>A1</p></div>
                            <div className="detailThird primary-analog-2"><p>A2</p></div>
                        </div>
                        <div className="palette-container">
                            <div className="detailThird primary-twolight"><p>Light</p></div>
                            <div className="detailSecond primary-light"><p>Light</p></div>
                            <div className="detailPrime primary"><p>Prime</p></div>
                            <div className="detailSecond primary-dark"><p>Dark</p></div>
                            <div className="detailThird primary-twodark"><p>Dark</p></div>
                        </div>
                        {/* {projectDetails.primary} */}

                    </div>

                </div>

                {/* NEW PAINT INPUTS */}
                <div id='middle-bar'>

                    <div id='add-paint'>

                        <div id='paint-show'>
                            <label><input
                                className='color-select'
                                type='color'
                                disabled
                                value={paintProject}
                            >
                            </input></label>
                        </div>

                        <div id='paint-dropdowns'>

                            <label>Paint <br /><select
                                name='paints'
                                id='paint-dropdown'
                                // onChange={(e) => setPaintProject(JSON.parse(e.target.value))}
                                // onChange={(e) => setNewPaint({ ...newPaint, paint_id: (JSON.parse(e.target.value))})}
                                onChange={(e) => setMultiple({ ...newPaint, paint_id: (JSON.parse(e.target.value)) })}

                            >
                                {paints.map((paint) =>
                                    // <option value={paint.hexcode} key={paint.id}>{paint.paint}</option>
                                    <option value={JSON.stringify({ hexcode: paint.hexcode, id: paint.id })} key={paint.id}>{paint.paint}</option>
                                )}
                            </select></label>

                            <label>Technique <br /><select
                                name='techniques'
                                id='technique-dropdown'
                                onChange={newPaintChange('technique_id')}
                            >
                                {techniqueList.map((technique) =>
                                    <option value={technique.id} key={technique.id}>{technique.technique}</option>
                                )}


                                {/* !! Adding new TEXT AREA for NOTES */}
                            </select></label>

                            <label><textarea
                                name='notes'
                                onChange={newPaintChange('notes')}
                                placeholder='paint notes here...'
                            ></textarea></label>

                            {/* image upload for new paint addition */}
                            <ImageUpload photoFunction={newPaintImage} />


                            <button
                                onClick={addNewPaint}
                                className='btn'
                            >Add Paint</button>


                        </div>
                    </div>

                    <div id='button-bar'>

                        {/* Toggle Buttons to Edit Project */}
                        {toggleProject === true ?
                            <button
                                onClick={() => editProject(projectDetails.id)}
                                id='edit-project'
                                className='btn'
                            >Edit <br /> Project</button>
                            :
                            <>
                                <button onClick={cancelEdit}>Cancel</button>
                                <button onClick={saveEdits}>Save</button>
                            </>
                        }

                        <button
                            onClick={() => deleteProject(projectDetails.id)}
                            id='delete-project'
                            className='btn'
                        >Delete <br /> Project</button>

                    </div>
                </div>


                {/* begin the details item list  */}
                <div id='painted-models'>
                    {paintDetails.map((paint) =>
                        <PaintDetails paint={paint} refreshDetails={refreshDetails} />
                    )}
                </div>
                {/* ! map for the paint details component */}

                {/* </div> */}

            </div>

        </div>
    );
}

export default ProjectDetails;
