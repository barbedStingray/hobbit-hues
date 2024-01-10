
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// components
import ImageUpload from '../ImageUpload/ImageUpload.jsx';
import PaintDetails from '../PaintDetails/PaintDetails';
import SelectTechnique from '../SelectTechnique/SelectTechnique.jsx';
// todo import ButtonB from '../ButtonB/ButtonB.jsx';
//css
import './ProjectDetails.css';



function ProjectDetails() {

    // reducer information
    const store = useSelector((store) => store);
    const paints = useSelector((store) => store.setPaintsDropdown); // list of paints
    const projectDetails = useSelector((store) => store.projectDetails); // list of projects details
    const techniqueList = useSelector((store) => store.techniqueList); // list of techniques
    const paintDetails = useSelector((store) => store.paintDetails); // list of paint details for project

    // middleware functions
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams(); // hook for refresh

    // VARIABLES FOR PROJECT DETAILS
    const [paintProject, setPaintProject] = useState('#hexcode'); // POST new paint variable
    const [toggleProject, setToggleProject] = useState(true); // toggle for editing project details
    const [togglePaint, setTogglePaint] = useState(true); // toggle the add paint menu
    let [imagePath, setImagePath] = useState(''); // new main photo display
    let [newPaint, setNewPaint] = useState({
        project_id: id,
        paint_id: '38',
        technique_id: '1',
        photo: '',
        notes: ''
    }); // variable to post a new paint
    const [editProjectPackage, setEditProjectPackage] = useState({
        id: id,
        description: ``,
        picture: ''
    }); // used to PUT new picture and description
    // custom motion Variables
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            // scale: 1,
            transition: {
                // duration: 2,
                // delayChildren: 0.25,
                // staggerChildren: 0.1
            }
        }
    };
    const mainPhotoMotion = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };



    // ** Functions ****************

    // pageReload functions if ID changes
    useEffect(() => {
        refreshDetails()
        fetchPaintsDropdown()
        fetchTechniqueDropdown()
    }, [id]);

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
    // function sets new paint and paint project variables
    function setMultiple(benThought) {
        setNewPaint({ ...newPaint, paint_id: benThought.paint_id.id });
        setPaintProject(benThought.paint_id.hexcode);
    }
    // page refresh function
    function refreshDetails() {
        dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: id });
    }
    // fetches paint dropdowns
    function fetchPaintsDropdown() {
        dispatch({ type: 'FETCH_PAINTS_DROPDOWN' });
    }
    // fetches technique dropdowns
    function fetchTechniqueDropdown() {
        dispatch({ type: 'FETCH_TECHNIQUES_DROPDOWN' });
    }
    // POST function to add new paint
    function addNewPaint() {
        // dispatch to POST Saga
        dispatch({ type: 'POST_PROJECT_PAINT', payload: newPaint });
        // todo clear your inputs?
        // close your paint menu
        setTogglePaint(!togglePaint);
        // refresh page
        refreshDetails();
    }
    // DELETE entire project
    function deleteProject(project) {
        // dispatch the delete 
        dispatch({ type: 'DELETE_ENTIRE_PROJECT', payload: project });
        // navigate to /projects
        history.push('/projects');
    }
    // toggles the Edit box appearances and propagates two buttons 'save' and 'cancel'
    function editProject() {
        // toggle your edit boxes
        setToggleProject(!toggleProject);
        // set your delivery package
        setEditProjectPackage({
            id: id,
            description: `${projectDetails.description}`,
            picture: `${projectDetails.picture}`
        });
    }
    // cancels your edit and resets your appearances
    function cancelEdit() {
        setToggleProject(!toggleProject);
        setImagePath('');
    }
    // PUT request for chaning your main descriptors
    function saveEdits() {
        // dispatch your new information
        dispatch({ type: 'UPDATE_PROJECT_DETAILS', payload: editProjectPackage });
        // refresh the page
        setTimeout(() => refreshDetails(), 250);
        setTimeout(() => setToggleProject(!toggleProject), 250);
    }
    // handles the description change of your edit package
    const editProjectChange = (key) => (event) => {
        setEditProjectPackage({ ...editProjectPackage, [key]: event.target.value });
    }
    // prepares new picture for PUT request, props of ImageUpdate component
    function editProjectPicture(properties) {
        setEditProjectPackage({ ...editProjectPackage, picture: properties });
        setImagePath(properties);
    }
    // toggles paint menu
    function paintMenu() {
        setTogglePaint(!togglePaint);
        console.log(`paintMenu toggle`, togglePaint);
    }
    // toggles your project public/private
    function togglePublicPrivate() {
        console.log(`making your project public`);
        dispatch({ type: 'MAKE_PUBLIC_PRIVATE', payload: id });
        // setTogglePublic(!togglePublic);
        // console.log(`togglePublic`, togglePublic);
        setTimeout(() => refreshDetails(), 150);

    }






    return (
        <m.div
            key={'createMotionProjectDetails'}
            className="container"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.55, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
            id='details-page'>

            <div id='details-header'>
                <h2>{projectDetails.model}</h2>
            </div>

            <div id='details-body'>

                {/* page left display */}
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
                            </textarea>}
                    </div>

                    <div id='projectImage-div'>
                        {toggleProject === true ?
                            <m.img
                                key={'motionMainPhoto'}
                                variants={mainPhotoMotion}
                                src={projectDetails.picture}
                                alt="No Photo Uploaded"
                                className='detailsPhoto mainPhotoMotion'
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.5 }
                                }}

                            />
                            :
                            <>
                                <ImageUpload photoFunction={editProjectPicture} />
                                {imagePath === '' ? (
                                    <></>
                                ) : (
                                    <div id='image-preview'>

                                        <img className='newMainUpload' src={imagePath} />
                                    </div>
                                )}
                            </>}
                    </div>

                    <div id='palette-button'>
                        <div id='detail-palette'>
                            {/* Project Color Display */}
                            <div className="palette-container">
                                <div className="detailThird primary-triad-2 "><p>T2</p></div>
                                <div className="detailSecond primary-triad-1 "><p>T1</p></div>
                                <div className="detailPrime primary-complement "><p>Comp.</p></div>
                                <div className="detailSecond primary-analog-1 "><p>A1</p></div>
                                <div className="detailThird primary-analog-2 "><p>A2</p></div>
                            </div>
                            <div className="palette-container">
                                <div className="detailThird primary-twolight"><p>Light</p></div>
                                <div className="detailSecond primary-light"><p>Light</p></div>
                                <div className="detailPrime primary"><p>Prime</p></div>
                                <div className="detailSecond primary-dark"><p>Dark</p></div>
                                <div className="detailThird primary-twodark"><p>Dark</p></div>
                            </div>
                        </div>

                        <button
                            className={projectDetails.public ? 'btn_pb' : 'btn_pc'}
                            onClick={togglePublicPrivate}
                        >{projectDetails.public ? 'Public' : 'Private'}</button>
                    </div>

                </div>

                {/* NEW PAINT INPUTS */}
                <div id='middle-bar'>
                    {togglePaint === true ?
                        <></>
                        :
                        <div>
                            <div id='add-paint'>
                                <button
                                    onClick={addNewPaint}
                                    className='btn_sm'
                                >Add Paint</button>

                                <div id='paint-show'>
                                    <label><input
                                        className='color-select'
                                        type='color'
                                        disabled
                                        value={paintProject}
                                    ></input></label>
                                </div>

                                <label><select
                                    name='paints'
                                    className='selectBox'
                                    onChange={(e) => setMultiple({ ...newPaint, paint_id: (JSON.parse(e.target.value)) })}
                                >
                                    {paints.map((paint) =>
                                        <option value={JSON.stringify({ hexcode: paint.hexcode, id: paint.id })} key={paint.id}>{paint.paint}</option>
                                    )}
                                </select></label>

                                <SelectTechnique
                                    changeFunction={newPaintChange}
                                    stringChange={'technique_id'}
                                    techniqueList={techniqueList}
                                />
                                <label><textarea
                                    name='notes'
                                    onChange={newPaintChange('notes')}
                                    placeholder='paint notes here...'
                                    className='notesArea'
                                ></textarea></label>

                                <ImageUpload photoFunction={newPaintImage} />
                            </div>
                        </div>
                    }

                    <div id='button-bar'>

                        <button
                            onClick={paintMenu}
                            className='btn_sm'
                        >{togglePaint === true ?
                            'Paint Menu'
                            :
                            'Close Menu'}</button>

                        {/* Toggle Buttons to Edit Project */}
                        {toggleProject === true ?
                            <button
                                onClick={() => editProject(projectDetails.id)}
                                id='edit-project'
                                className='btn_sm'
                            >Edit Project</button>
                            :
                            <div id='cancelSave'>
                                <button className='btn_sm' onClick={cancelEdit}>Cancel</button>
                                <button className='btn_sm' onClick={saveEdits}>Save</button>
                            </div>
                        }

                        <button
                            onClick={() => deleteProject(projectDetails.id)}
                            id='delete-project'
                            className='btn_sm btn_del'
                        >Delete Project</button>

                    </div>
                </div>

                {/* begin the details item list  */}
                <div id='painted-models'>
                    {paintDetails.map((paint) =>
                        <PaintDetails paint={paint} refreshDetails={refreshDetails} />
                    )}
                </div>
            </div>
        </m.div>
    );
}

export default ProjectDetails;
