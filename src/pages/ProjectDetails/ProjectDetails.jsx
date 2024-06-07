
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';

// components
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx';
import PaintDetails from '../../components/PaintDetails/PaintDetails.jsx';
import ModelDescription from '../../components/ModelDescription/ModelDescription.jsx';
import PaintList from '../../components/PaintList/PaintList.jsx';
import './ProjectDetails.css';
// scripts 
import handleObjectChange from '../../scripts/handleObjectChange.js';


function ProjectDetails({ canEdit }) {

    // const store = useSelector((store) => store);
    const paints = useSelector((store) => store.setPaintsDropdown); // list of paints
    const projectDetails = useSelector((store) => store.projectDetails); // list of projects details
    const techniqueList = useSelector((store) => store.techniqueList); // list of techniques
    const paintDetails = useSelector((store) => store.paintDetails); // list of paint details for project

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // hook for refresh

    const [displayView, setDisplayView] = useState('mainDescription')
    const [editModal, setEditModal] = useState(false);

    const [newPaintStep, setNewPaintStep] = useState({
        project_id: id,
        paint_id: '38',
        technique_id: '1',
        photo: '',
        notes: ''
    });
    const [editProjectPackage, setEditProjectPackage] = useState({
        id: id,
        description: ``,
        picture: ''
    }); // used to PUT new picture and description

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


    useEffect(() => {
        refreshDetails();
        fetchPaintsDropdown();
        fetchTechniqueDropdown();
    }, [id]);

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


    // Variable Handling
    function newPaintImage(newImage) {
        setNewPaintStep({ ...newPaintStep, photo: newImage });
    }
    function editProjectPicture(properties) {
        setEditProjectPackage({ ...editProjectPackage, picture: properties });
    }
    function setDefaultInfoForEditModal() {
        if (displayView === 'mainDescription') {
            setEditProjectPackage({
                id: projectDetails.id,
                description: projectDetails.description,
                picture: projectDetails.picture
            });
        } else {
            setNewPaintStep({
                project_id: id,
                paint_id: '38',
                technique_id: '1',
                photo: '',
                notes: ''
            });
        }
        setEditModal(true);
    }


    // ** POST Requests
    function addNewPaint() {
        dispatch({ type: 'POST_PROJECT_PAINT', payload: newPaintStep });
        refreshDetails();
        setEditModal(false);
    }

    // ** DELETE requests
    function deleteProject(project) {
        dispatch({ type: 'DELETE_ENTIRE_PROJECT', payload: project });
        navigate('/projects');
    }

    // ** PUT requests
    function saveEdits() {
        dispatch({ type: 'UPDATE_PROJECT_DETAILS', payload: editProjectPackage });
        setTimeout(() => refreshDetails(), 250);
        setEditModal(false);
    }
    function togglePublicPrivate() {
        dispatch({ type: 'MAKE_PUBLIC_PRIVATE', payload: id });
        setTimeout(() => refreshDetails(), 150);
    }

    // ** PAGE VIEWS
    function determineEditView(displayView) {
        switch (displayView) {
            case 'mainDescription':
                return <>
                    <div className='editMenuOptions'>
                        <div className='editInputs'>
                            <ImageUpload photoFunction={editProjectPicture} />
                            <img className='editMainImage' alt='main image' src={editProjectPackage.picture} />
                            <textarea
                                name='description'
                                className='editDescription'
                                value={editProjectPackage.description}
                                onChange={(e) => handleObjectChange(e, setEditProjectPackage, editProjectPackage)}
                                placeholder='Description of the project...'>
                            </textarea>
                        </div>
                        <div className='editButtons'>
                            <button onClick={saveEdits} className='btn'>Save Changes</button>
                            <button className='btn' onClick={togglePublicPrivate}>{projectDetails.public ? 'Public' : 'Private'}</button>
                            <button onClick={() => deleteProject(projectDetails.id)} className='btn'>Delete Project</button>
                        </div>
                    </div>
                </>

            case 'stepByStep':
                return <>
                    <div className='editMenuOptions'>
                        <div className='editInputs'>
                            <ImageUpload photoFunction={newPaintImage} />
                            <img className='editMainImage' style={{ color: 'white' }} alt='Upload An Image' src={newPaintStep.photo} />
                        </div>
                        <div className='editButtons'>
                            <select
                                name='paint_id'
                                className='paintSelectBox'
                                onChange={(e) => handleObjectChange(e, setNewPaintStep, newPaintStep)}
                            >
                                {paints.map((paint) =>
                                    // <option value={JSON.stringify({ hexcode: paint.hexcode, id: paint.id })} key={paint.id}>{paint.paint}</option>
                                    <option value={paint.id} key={paint.id}>{paint.paint}</option>
                                )}
                            </select>

                            <select
                                name='technique_id'
                                className='paintSelectBox'
                                onChange={(e) => handleObjectChange(e, setNewPaintStep, newPaintStep)}
                            >
                                {techniqueList.map((technique) => (
                                    <option value={technique.id} key={technique.id}>{technique.technique}</option>
                                ))}
                            </select>

                            <textarea
                                name='notes'
                                className='editDescription'
                                onChange={(e) => handleObjectChange(e, setNewPaintStep, newPaintStep)}
                                placeholder='paint notes here...'
                            ></textarea>
                            <button onClick={addNewPaint} className='btn'>Add Paint</button>
                        </div>

                    </div>
                </>
            default:
                return console.log('buttons went wrong!');
        }
    }

    function determineDisplay(displayView) {
        console.log('determining display', displayView);
        switch (displayView) {
            case 'mainDescription':
                return <>
                    <div className='detailsLeftSide'>
                        <ModelDescription picture={projectDetails.picture} description={projectDetails.description} />
                    </div>
                    <div className='detailsRightSide'>
                        <div className='overflowPaintListContainer'>
                            <PaintList paintDetails={paintDetails} />
                        </div>
                    </div>
                </>
            case 'stepByStep':
                return <>
                    <div className='overflowPaintStepsContainer'>
                        {paintDetails.map((paint, i) =>
                            <PaintDetails key={i} paint={paint} refreshDetails={refreshDetails} />
                        )}
                    </div>
                </>
            default:
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
            {editModal ? (
                <div className='editModal'>
                    {determineEditView(displayView)};
                    <button onClick={() => setEditModal(false)} className='btn'>Go Back</button>
                </div>
            ) : (
                <></>
            )}

            <p className='pageHeading'>{projectDetails.model}</p>
            <div className='viewButtons'>
                <button onClick={() => setDisplayView(displayView === 'mainDescription' ? 'stepByStep' : 'mainDescription')} className='btn'>{displayView === 'mainDescription' ? 'Paint Steps' : 'Model View'}</button>
                {canEdit ? (
                    <>
                        <button onClick={setDefaultInfoForEditModal} className='btn'>{displayView === 'stepByStep' ? 'Add A Step' : 'Edit Project'}</button>
                    </>
                ) : (
                    <></>
                )}

            </div>
            <div className='detailsBody'>
                {determineDisplay(displayView)}
            </div>
        </m.div>
    );
}

export default ProjectDetails;
