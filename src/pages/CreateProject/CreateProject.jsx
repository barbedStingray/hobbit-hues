

// IMPORTS
// middleware
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// components
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx';
// css
import './CreateProject.css';

// scripts
import handleObjectChange from '../../scripts/handleObjectChange.js';



function CreateProject() {

    // middleware variables
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // redux variables
    // const store = useSelector((store) => store);
    const user = useSelector((store) => store.user);
    const hexcode = useSelector((store) => store.hexcode);

    // variables
    // let [imagePath, setImagePath] = useState(''); // image upload variable
    let [newProject, setNewProject] = useState({
        user_id: user.id,
        model: '',
        primary: hexcode,
        description: '',
        picture: ''
    });
    console.log('newProject', newProject);


    // ** Functions ************


    function setNewProjectImageUp(properties) {
        setNewProject({ ...newProject, picture: properties });
    }

    // Create your new project - submit your form!
    function createProject(e) {
        e.preventDefault();
        dispatch({ type: 'CREATE_NEW_PROJECT', payload: newProject });
        navigate('/projects');
    }

    // Animation variable
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            // scale: 1,
            transition: {
                // duration: 2,
                delayChildren: 0.5,
                staggerChildren: 0.2
            }
        }
    };



    return (

        <m.div
            key={'createMotionProject'}
            className="createProjectPage"
            variants={container}
            initial="hidden"
            transition={{ duration: 0.55, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
        >

            {/* Heading Div */}
            <p className='pageHeading'>Create A Project!</p>

            {/* Create New Project Form */}
            <form className='newProjectForm'>


                <input
                    name='model'
                    className='newProjectNameInput'
                    onChange={(e) => handleObjectChange(e, setNewProject, newProject)}
                    type='text'
                    placeholder='Model Name Here...'
                >
                </input>

                {/* display hexCode palette */}
                {/* <div id='palette-variable'>
                        <p>Palette: {hexcode}</p>
                    </div> */}

                <textarea
                    name='description'
                    className='newProjectDescriptionTextArea'
                    onChange={(e) => handleObjectChange(e, setNewProject, newProject)}
                    placeholder='Description of the project...'>
                </textarea>

                <ImageUpload photoFunction={setNewProjectImageUp} />

                <div className='photoUploadDiv'>
                    {
                        newProject.picture === '' ? (
                            <></>
                        ) : (
                            <img className='uploadImage' src={newProject.picture} />
                        )
                    }
                </div>

                <button onClick={createProject} className="btn">Create!</button>
            
            </form>
        </m.div>
    );
}

export default CreateProject;
