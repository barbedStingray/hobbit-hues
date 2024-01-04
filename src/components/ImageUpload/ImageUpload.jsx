
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ImageUpload(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);

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
                // ! optional form of setting data:         setNewProject({ ...newProject, picture: response.data.url });
                // ! this is the line:                      setMultiple(response.data.url);
            }).catch(error => {
                console.log('error', error);
                alert('Something went wrong');
            })
        } else {
            alert('Please select an image');
        }
    }




    return (
            <div id='picture-input'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                />
                <br />
                {/* {
                    imagePath === '' ? (
                        <h3>Upload a Photo!</h3>
                    ) : (
                        <img className='mainUpload' src={imagePath} />
                    )
                } */}

            </div>
    );
}

export default ImageUpload;
