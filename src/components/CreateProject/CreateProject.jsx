
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function CreateProject(props) {

    const history = useHistory();
    const dispatch = useDispatch();

    const store = useSelector((store) => store);
    const user = useSelector((store) => store.user);
    const hexcode = useSelector((store) => store.hexcode);
    const [heading, setHeading] = useState('Create a Project!');


    // image upload variable
    let [imagePath, setImagePath] = useState('');


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


    // submit your form!
    function createProject(e) {
        e.preventDefault();
        console.log(`creating your new project`);

        // dispatch newProject
        dispatch({ type: 'CREATE_NEW_PROJECT', payload: newProject });

        // navigate to project page
        history.push('/projects');
    }

    // back to color wheel
    function goToColorWheel() {
        console.log(`going back to color wheel`);
        history.push('/user');
    }


    const onFileChange = async (event) => {
        // Access the selected file
        const fileToUpload = event.target.files[0];

        // Limit to specific file types.
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        // Check if the file is one of the allowed types.
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            const formData = new FormData();

            // todo convert heic files
            // Convert HEIC to JPEG
                // if (fileToUpload.type === 'image/heic') {
                //     const { buffer } = await heicConvert({
                //         buffer: await fileToUpload.arrayBuffer(),
                //         format: 'JPEG',
                //         quality: 1,
                //     });
                //     const convertedFile = new File([buffer], 'image.jpg', { type: 'image/jpeg' });
                //     formData.append('file', convertedFile);
                // } else {
                //     formData.append('file', fileToUpload);
                // }

            formData.append('file', fileToUpload);
            // console.log(`process.env.REACT_APP_PRESET`, process.env.REACT_APP_PRESET);


            formData.append('upload_preset', process.env.REACT_APP_PRESET);
            let postUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
            console.log(`postURL`, postUrl);
            // console.log(`TARGET MARK`);
            axios.post(postUrl, formData).then(response => {
                console.log('Success!', response);
                setNewProject({ ...newProject, picture: response.data.url });
            }).catch(error => {
                console.log('error', error);
                alert('Something went wrong');
            })
        } else {
            alert('Please select an image');
        }
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

                <div id='palette-variable'>
                    <p>Palette Code: {hexcode}</p>
                </div>

                <div id='description-input'>
                    <textarea 
                        onChange={projectChange('description')}
                        id='createDescription-input' 
                        placeholder='Description of the project...'>
                    </textarea>
                </div>


                <div id='picture-input'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                    />
                    <br />
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



            {/* <div id='toColors-button'>
                <button onClick={goToColorWheel} className="btn">Return to Color Selection</button>
            </div> */}

        </div>
    );
}

export default CreateProject;
