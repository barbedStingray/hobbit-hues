
// IMPORTS
import axios from 'axios';



function ImageUpload(props) {

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
                props.photoFunction(response.data.url);
                alert(`Upload Success!`);
            }).catch(error => {
                console.log('error', error);
                alert('There was an issue uploading your photo, refresh and try again');
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
            </div>
    );
}

export default ImageUpload;
