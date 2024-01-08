

// IMPORTS
// middleware
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AnimatePresence, motion as m } from 'framer-motion';
// components
import ImageUpload from '../ImageUpload/ImageUpload.jsx';
// css
import './CreateProject.css';



function CreateProject() {

    // middleware variables
    const history = useHistory();
    const dispatch = useDispatch();

    // redux variables
    const store = useSelector((store) => store);
    const user = useSelector((store) => store.user);
    const hexcode = useSelector((store) => store.hexcode);

    // variables
    const [heading, setHeading] = useState('Create a Project!');
    let [imagePath, setImagePath] = useState(''); // image upload variable
    let [newProject, setNewProject] = useState({
        user_id: user.id,
        model: '',
        primary: hexcode,
        description: '',
        picture: ''
    }); // axios.post to projects table


    // ** Functions ************

    // function to change newProject variable
    const projectChange = (key) => (event) => {
        // console.log('changed newProject');
        setNewProject({ ...newProject, [key]: event.target.value })
    }

    // function sets the newProject image and imagePath variables
    function setMultiple(properties) {
        // console.log(`setting multiple`);
        // console.log(`properties:`, properties);
        // set image for object passed to axios
        setNewProject({ ...newProject, picture: properties });
        // set image for display to dom
        setImagePath(properties);
    }

    // Create your new project - submit your form!
    function createProject(e) {
        e.preventDefault();
        // console.log(`creating your new project`);
        // dispatch newProject
        dispatch({ type: 'CREATE_NEW_PROJECT', payload: newProject });
        // navigate to project page
        history.push('/projects');
    }

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
        className="container"
        variants={container}
        initial="hidden"
        transition={{ duration: 0.75, ease: 'easeOut' }}
        animate="visible"
        exit={{ 
            opacity: 0,
            transition: { duration: 0.5 }
        }}

        id='create-page'>

            {/* Heading Div */}
            <div id='create-heading'>
                <h3>{heading}</h3>
            </div>
            
            {/* Create New Project Form */}
            <form id='create-form'>

                <div id='model-input'>

                    {/* model name input */}
                    <input
                        id='model-box'
                        onChange={projectChange('model')}
                        type='text'
                        placeholder='Model Name Here...'
                    >
                    </input>

                    {/* display hexCode palette */}
                    <div id='palette-variable'>
                        <p>Palette: {hexcode}</p>
                    </div>

                </div>


                {/* Description of Model Input */}
                <div id='description-input'>
                    <textarea
                        onChange={projectChange('description')}
                        id='createDescription-input'
                        placeholder='Description of the project...'>
                    </textarea>
                </div>

                {/* Image Upload Section */}
                <div id='image-work'>
                    <ImageUpload photoFunction={setMultiple} />
                    {
                        imagePath === '' ? (
                            <></>
                        ) : (
                            <div 
                            id='image-preview'>

                                <img className='mainUpload' src={imagePath} />
                            </div>
                        )
                    }
                </div>

                {/* Create new project Button - submit form */}
                <div id='create-submit'>
                    <button onClick={createProject} className="btn">Create!</button>
                </div>

            </form>
        </m.div>
    );
}

export default CreateProject;
