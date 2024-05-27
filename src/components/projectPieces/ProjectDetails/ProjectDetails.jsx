
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// components
import ImageUpload from '../../ImageUpload/ImageUpload.jsx';
import PaintDetails from '../../PaintDetails/PaintDetails.jsx';
import SelectTechnique from '../../SelectTechnique/SelectTechnique.jsx';

// ** NEW
import ModelDescription from '../../ModelDescription/ModelDescription.jsx';
import PaintList from '../../PaintList/PaintList.jsx';

//css
import './ProjectDetails.css';

// scripts 
import handleObjectChange from '../../../scripts/handleObjectChange.js';



function ProjectDetails() {

    // reducer information
    const store = useSelector((store) => store);
    const paints = useSelector((store) => store.setPaintsDropdown); // list of paints
    const projectDetails = useSelector((store) => store.projectDetails); // list of projects details
    const techniqueList = useSelector((store) => store.techniqueList); // list of techniques
    const paintDetails = useSelector((store) => store.paintDetails); // list of paint details for project
    console.log('paintdetails', paintDetails);

    // middleware functions
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams(); // hook for refresh

    // VARIABLES FOR PROJECT DETAILS


    const [paintProject, setPaintProject] = useState('#hexcode'); // POST new paint variable
    const [toggleEditMainProject, setToggleEditMainProject] = useState(false); // toggle for editing project details
    const [toggleAddAPaint, setToggleAddAPaint] = useState(false); // toggle the add paint menu

    let [imagePath, setImagePath] = useState(''); // new main photo display

    let [newPaintStep, setNewPaintStep] = useState({
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
            scale: 1,
            transition: {
                duration: 0.5,
                delayChildren: 0.3,
                // staggerChildren: 1.0
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
        refreshDetails();
        fetchPaintsDropdown();
        fetchTechniqueDropdown();
        // return () => {
        //     dispatch({ type: 'RESET_PROJECT_DETAILS' });
        // }
    }, [id]);





    // !! ADD NEW PAINT 
    // function to set newPaint
    const newPaintChange = (key) => (event) => {
        console.log('changed newProject');
        setNewPaintStep({ ...newPaintStep, [key]: event.target.value });
    }
    // set new paint IMAGE FUNCTION
    function newPaintImage(newImage) {
        console.log(`adding the new paint image to the new paint variable`);
        setNewPaintStep({ ...newPaintStep, photo: newImage });
    }
    // POST function to add new paint
    function addNewPaint() {
        // dispatch to POST Saga
        dispatch({ type: 'POST_PROJECT_PAINT', payload: newPaintStep });
        // ? clear your inputs?
        // close your paint menu
        // setTogglePaint(!togglePaint);
        // clear your new paint variable
        // setNewPaintStep({
        //     project_id: id,
        //     paint_id: '38',
        //     technique_id: '1',
        //     photo: '',
        //     notes: ''
        // });
        // reset your paint project variable to black
        setPaintProject('#000000');
        
        // refresh page
        refreshDetails();
    }

    console.log('newPaint', newPaintStep);






    // // function sets new paint and paint project variables
    // function setMultiple(benThought) {
    //     setNewPaint({ ...newPaint, paint_id: benThought.paint_id.id });
    //     setPaintProject(benThought.paint_id.hexcode);
    // }



    // !! page refresh functions
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

    // // DELETE entire project
    // function deleteProject(project) {
    //     // dispatch the delete 
    //     dispatch({ type: 'DELETE_ENTIRE_PROJECT', payload: project });
    //     // navigate to /projects
    //     history.push('/projects');
    // }




    // toggles the Edit box appearances and propagates two buttons 'save' and 'cancel'
    function editProject() {
        setToggleEditMainProject(!toggleEditMainProject);
        setEditProjectPackage({
            id: id,
            description: `${projectDetails.description}`,
            picture: `${projectDetails.picture}`
        });
    }
    // // cancels your edit and resets your appearances
    // function cancelEdit() {
    //     setToggleProject(!toggleProject);
    //     setImagePath('');
    // }
    // // PUT request for chaning your main descriptors
    // function saveEdits() {
    //     // dispatch your new information
    //     dispatch({ type: 'UPDATE_PROJECT_DETAILS', payload: editProjectPackage });
    //     // refresh the page
    //     setTimeout(() => refreshDetails(), 250);
    //     setTimeout(() => setToggleProject(!toggleProject), 250);
    // }



    // prepares new picture for PUT request, props of ImageUpdate component
    function editProjectPicture(properties) {
        setEditProjectPackage({ ...editProjectPackage, picture: properties });
        setImagePath(properties);
    }
    // // toggles paint menu
    // function paintMenu() {
    //     setTogglePaint(!togglePaint);
    // }
    // // toggles your project public/private
    // function togglePublicPrivate() {
    //     dispatch({ type: 'MAKE_PUBLIC_PRIVATE', payload: id });
    //     setTimeout(() => refreshDetails(), 150);
    // }






    const [displayView, setDisplayView] = useState('mainDescription')



    console.log('editProjectPackage', editProjectPackage);
    function determineEditView(displayView) {
        switch (displayView) {
            case 'mainDescription':
                return <div className='editMenuOptions'>

                    {toggleEditMainProject ? (
                        <div>
                            <button className='btn' onClick={() => setToggleEditMainProject(!toggleEditMainProject)}>
                                Cancel
                            </button>
                            <ImageUpload photoFunction={editProjectPicture} />
                            <textarea
                                name='description'
                                className=''
                                value={editProjectPackage.description}
                                onChange={(e) => handleObjectChange(e, setEditProjectPackage, editProjectPackage)}
                                placeholder='Description of the project...'>
                            </textarea>
                        </div>
                    ) : (
                        <button
                            onClick={() => editProject(projectDetails.id)}
                            id='edit-project'
                            className='btn'
                        >
                            Edit Project
                        </button>
                    )}

                </div >

            case 'paintList':
                return <div className='editMenuOptions'>
                    <p>PAINT LIST</p>
                </div>
            case 'stepByStep':
                return <div className='editMenuOptions'>
                    {toggleAddAPaint ? (
                        <div>
                            <button className='btn' onClick={() => setToggleAddAPaint(!toggleAddAPaint)}>Cancel</button>
                            <button onClick={addNewPaint} className='btn'>Add Paint</button>

                            <input
                                className='color-select'
                                type='color'
                                disabled
                                value={paintProject}
                            />

                            <select
                                name='paint_id'
                                onChange={(e) => handleObjectChange(e, setNewPaintStep, newPaintStep)}
                            >
                                {paints.map((paint) =>
                                    // <option value={JSON.stringify({ hexcode: paint.hexcode, id: paint.id })} key={paint.id}>{paint.paint}</option>
                                    <option value={paint.id} key={paint.id}>{paint.paint}</option>
                                )}
                            </select>

                            <select
                                name='technique_id'
                                onChange={(e) => handleObjectChange(e, setNewPaintStep, newPaintStep)}
                            >
                                {techniqueList.map((technique) => (
                                    <option value={technique.id} key={technique.id}>{technique.technique}</option>
                                ))}
                            </select>

                            <textarea
                                name='notes'
                                onChange={(e) => handleObjectChange(e, setNewPaintStep, newPaintStep)}
                                placeholder='paint notes here...'
                            ></textarea>
                        </div>
                    ) : (
                        <button onClick={() => setToggleAddAPaint(!toggleAddAPaint)} className='btn'>
                            Add A Step
                        </button>
                    )}

                </div>
            default:
                return console.log('buttons went wrong!');
        }
    }








    function determineButtons(displayView) {
        switch (displayView) {
            case 'mainDescription':
                return <div className='viewButtons'>
                    {/* <button onClick={() => setDisplayView('mainDescription')} className='btn'>desc</button> */}
                    <button onClick={() => setDisplayView('paintList')} className='btn'>paints</button>
                    <button onClick={() => setDisplayView('stepByStep')} className='btn'>steps</button>
                </div>
            case 'paintList':
                return <div className='viewButtons'>
                    <button onClick={() => setDisplayView('mainDescription')} className='btn'>desc</button>
                    {/* <button onClick={() => setDisplayView('paintList')} className='btn'>paints</button> */}
                    <button onClick={() => setDisplayView('stepByStep')} className='btn'>steps</button>
                </div>
            case 'stepByStep':
                return <div className='viewButtons'>
                    <button onClick={() => setDisplayView('mainDescription')} className='btn'>desc</button>
                    <button onClick={() => setDisplayView('paintList')} className='btn'>paints</button>
                    {/* <button onClick={() => setDisplayView('stepByStep')} className='btn'>steps</button> */}
                </div>
            default:
                return console.log('buttons went wrong!');
        }
    }








    function determineDisplay(displayView) {
        console.log('determining display', displayView);
        switch (displayView) {
            case 'mainDescription':
                return <ModelDescription
                    picture={projectDetails.picture}
                    description={projectDetails.description}
                />
            case 'paintList':

                // returns paint list for model
                return <PaintList paintDetails={paintDetails} />

            case 'stepByStep':
                // returns step by step images
                return <div>
                    {paintDetails.map((paint, i) =>
                        <PaintDetails key={i} paint={paint} refreshDetails={refreshDetails} />
                    )}
                </div>
            default:
                // should never get here
                return console.log('Theyre taking the hobbits to Isengard');
        }

    }








    return (
        <m.div
            key={'createMotionProjectDetails'}
            className="myProjectDetailsPage"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.55, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
        >
            <p className='pageHeading'>{projectDetails.model}</p>

            <div className='detailsBody'>

                <div className='detailsLeftSide'>
                    <div className='overflowContainer'>
                        {determineDisplay(displayView)}
                    </div>
                </div>

                <div className='detailsRightSide'>
                    {determineButtons(displayView)}
                    {determineEditView(displayView)}
                </div>

            </div>


            {/*  ******** NEW FEATURES
                - main photo is a carousel slider for images
                - image will always be the most recent
                - as images rotate, paints rotate beneath it
                - eliminate hexcode circles palette
                - description on the side
                - Buttons on the side for editing
                - Button for toggling full list of paints instead of photos
            */}


























            {/* <div id='projectImage-div'>
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
                                <img className='newMainUpload' src={imagePath} alt={'Miniature Photo Here'} />
                            </div>
                        )}
                    </>}
            </div> */}



            {/* Palette and Public button */}

            {/* <button
                            className={projectDetails.public ? 'btn_pb' : 'btn_pc'}
                            onClick={togglePublicPrivate}
                        >{projectDetails.public ? 'Public' : 'Private'}
            </button> */}


            {/* NEW PAINT INPUTS */}
            {/* <div id='middle-bar'> */}

            {/* {togglePaint === true ?

                        <div id='project-mainDescription'>
                            {toggleProject === true ?
                                <p
                                    key={projectDetails.id}
                                >{projectDetails.description}
                                </p>
                                :
                                <textarea
                                    onChange={editProjectChange('description')}
                                    id='mainDescrip-input'
                                    value={editProjectPackage.description}
                                >
                                </textarea>}
                        </div>
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
                    } */}

            {/* <div id='button-bar'> */}
            {/* <button
                            onClick={paintMenu}
                            className='btn_sm'
                        >{togglePaint === true ?
                            'Paint Menu'
                            :
                            'Close Menu'}
                        </button> */}

            {/* Toggle Buttons to Edit Project */}
            {/* {toggleProject === true ?
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
                        } */}

            {/* <button
                            onClick={() => deleteProject(projectDetails.id)}
                            id='delete-project'
                            className='btn_sm btn_del'
                        >Delete Project</button> */}
            {/* </div> */}

            {/* </div> */}


        </m.div>
    );
}

export default ProjectDetails;
