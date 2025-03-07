import axios from 'axios'

function ImageUpload({ photoFunction }) {

    const onFileChange = async (event) => {
        // Access the selected file
        const fileToUpload = event.target.files[0]

        // ! Limit to specific file types. 
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/heic', 'image/webp']

        // Check if the file is one of the allowed types.
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            const formData = new FormData()

            formData.append('file', fileToUpload)
            formData.append('upload_preset', process.env.REACT_APP_PRESET)

            // ** folder path
            const folderPath = '/hobbit_hues'
            formData.append('folder', folderPath)

            let postUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`
            console.log(`postURL`, postUrl)

            // console.log(`TARGET MARK`)
            axios.post(postUrl, formData).then(response => {
                console.log('Success!', response)
                photoFunction(response.data.url)
                alert(`Upload Success!`)
            }).catch(error => {
                console.log('error', error)
                alert('Upload Incomplete, Accepted formats: .gif, .jpeg, .png, and .heic and .webp. Please refresh and try again');
            })
        } else {
            alert('Upload Incomplete, Accepted formats: .gif, .jpeg, .png, and .heic and .webp. Please refresh and try again');
        }
    }

    return (
        <div className='picture-input'>
            <input
                className='pictureImport'
                type="file"
                accept="image/*"
                onChange={onFileChange}
                id='fileInput'
            />
            <label htmlFor="fileInput" className="btn">Add a Photo!</label>
        </div>
    )
}

export default ImageUpload
