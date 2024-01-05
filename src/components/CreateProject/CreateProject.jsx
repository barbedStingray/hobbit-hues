

// IMPORTS
// middleware
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// components
import ImageUpload from '../ImageUpload/ImageUpload.jsx';



function CreateProject() {

    const history = useHistory();
    const dispatch = useDispatch();

    const store = useSelector((store) => store);
    const user = useSelector((store) => store.user);
    const hexcode = useSelector((store) => store.hexcode);
    const [heading, setHeading] = useState('Create a Project!');


    // image upload variable
    let [imagePath, setImagePath] = useState('');
    console.log(`hexcode passed:`, hexcode);


    // axios.post to projects table
    // variables include... user_id, model, primary, description, picture
    let [newProject, setNewProject] = useState({
        user_id: user.id,
        model: '',
        primary: hexcode,
        description: '',
        picture: ''
    });

    // function to change newProject variable
    const projectChange = (key) => (event) => {
        console.log('changed newProject');
        setNewProject({ ...newProject, [key]: event.target.value })
    }

    function setMultiple(properties) {
        console.log(`setting multiple`);
        console.log(`properties:`, properties);
        // set image for object
        setNewProject({ ...newProject, picture: properties });
        // set image for display
        setImagePath(properties);

    }


    // submit your form!
    function createProject(e) {
        e.preventDefault();
        console.log(`creating your new project`);

        // dispatch newProject
        dispatch({ type: 'CREATE_NEW_PROJECT', payload: newProject });

        // navigate to project page
        history.push('/projects');
    }



    return (
        <div id='create-page'>

            <div id='create-heading'>
                <h3>{heading}</h3>
                {/* <p>User ID: {user.id}</p> */}
            </div>

            {/* {JSON.stringify(newProject)} */}


            <form id='create-form'>

                <div id='model-input'>
                    {/* <h3>Name your Project!</h3>
                    <br /> */}
                    <input
                        id='model-box'
                        onChange={projectChange('model')}
                        type='text'
                        placeholder='model name...'>
                    </input>
                </div>

                {/* <div id='palette-variable'>
                    <p>Palette Code: {hexcode}</p>
                </div> */}

                <div id='description-input'>
                    <textarea
                        onChange={projectChange('description')}
                        id='createDescription-input'
                        placeholder='Description of the project...'>
                    </textarea>
                </div>


                <ImageUpload photoFunction={setMultiple} />

                <div id='image-preview'>
                    {
                        imagePath === '' ? (
                            <h3>Upload a Photo!</h3>
                        ) : (
                            <img className='mainUpload' src={imagePath} />
                        )

                    }
                </div>

                <div id='create-submit'>
                    <button onClick={createProject} className="btn">Create!</button>
                </div>

            </form>

        </div>
    );
}

export default CreateProject;
