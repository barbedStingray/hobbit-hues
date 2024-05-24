
// IMPORTS
// middleware
import axios from 'axios';



function ImageUpload(props) {

    const onFileChange = async (event) => {
        // Access the selected file
        const fileToUpload = event.target.files[0];

        // ! Limit to specific file types. 
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/heic'];

        // Check if the file is one of the allowed types.
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            const formData = new FormData();

            formData.append('file', fileToUpload);
            // console.log(`process.env.REACT_APP_PRESET`, process.env.REACT_APP_PRESET);
            formData.append('upload_preset', process.env.REACT_APP_PRESET);

            let postUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
            console.log(`postURL`, postUrl);

            // console.log(`TARGET MARK`);
            axios.post(postUrl, formData).then(response => {
                console.log('Success!', response);
                props.photoFunction(response.data.url);
                alert(`Upload Success!`);
            }).catch(error => {
                console.log('error', error);
                alert('Upload Incomplete, Accepted formats: .gif, .jpeg, .png, and .heic. Please refresh and try again');
            })
        } else {
            alert('Upload Incomplete, Accepted formats: .gif, .jpeg, .png, and .heic. Please refresh and try again');
        }
    }




    return (
        <div id='picture-input'>
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className='pictureImport'
                id='fileInput'
            />
            <label for="fileInput" className="ben-file-upload">Add a Photo!</label>

        </div>
    );
}

export default ImageUpload;
