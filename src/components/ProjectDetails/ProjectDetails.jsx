
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import PaintDetails from '../PaintDetails/PaintDetails';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProjectDetails() {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const paints = useSelector((store) => store.setPaintsDropdown);
    const projectDetails = useSelector((store) => store.projectDetails);
    const techniqueList = useSelector((store) => store.techniqueList);
    const paintDetails = useSelector((store) => store.paintDetails);


    const dispatch = useDispatch();
    const history = useHistory();

    // variables to post a new paint
    // const [paintProject, setPaintProject] = useState({ hexcode: '#000000', id: '0' });
    const [paintProject, setPaintProject] = useState('#hexcode');
    // const [technique, setTechnique] = useState('1');

    // This is going to be used to display the selected color palette
    const [detailPalette, setDetailPalette] = useState('projectDetails.primary');

    // hook for refresh
    const { id } = useParams();
    console.log(`useParams ID`, id);


    // variable to post a new paint
    let [newPaint, setNewPaint] = useState({
        project_id: id,
        paint_id: '38',
        technique_id: '1',
        photo: ''
    });
    // function to set newPaint
    const newPaintChange = (key) => (event) => {
        console.log('changed newProject');
        setNewPaint({ ...newPaint, [key]: event.target.value });

    }
    // function to submit new paint post
    function addNewPaint() {
        console.log(`adding new paint`);
        console.log(`newPaint object:`, newPaint);

        // dispatch to POST Saga
        dispatch({ type: 'POST_PROJECT_PAINT', payload: newPaint });
        refreshDetails();
        // setTimeout(refreshDetails(), 2000);
    }

    function setMultiple(benThought) {
        console.log(`setting multiple properties`);
        console.log(`benThought`, benThought);
        console.log(`benThought.paint_id.id`, benThought.paint_id.id);
        console.log(`benThought.paint_id.id`, benThought.paint_id.hexcode);
        setNewPaint({ ...newPaint, paint_id: benThought.paint_id.id });
        setPaintProject(benThought.paint_id.hexcode);
    }




    // loads details after page refresh
    function refreshDetails() {
        console.log(`refreshing details id:`, id);
        // fetch the project details
        dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: id });
    }
    // fetches paint dropdowns
    function fetchPaintsDropdown() {
        console.log(`getting paint dropdowns`);
        dispatch({ type: 'FETCH_PAINTS_DROPDOWN' });
    }
    // fetches technique dropdowns
    function fetchTechniqueDropdown() {
        console.log(`fetching techniques`);
        dispatch({ type: 'FETCH_TECHNIQUES_DROPDOWN' });
    }

    useEffect(() => {
        refreshDetails()
        fetchPaintsDropdown()
        fetchTechniqueDropdown()
        // setTimeout(setCssColorPrime(projectDetails[0].primary), 2000)
    }, [id]);



    // POST paint update







    // HSL CONVERSION FOR DETAILS

    // ! not complete
    function setCssColorPrime() {
        console.log(`updating detail palette`);
        // console.log(`Primary success!!!:`, projectDetails[0].primary);

    }

    // HSL CONVERSION FOR DETAILS











    // !! IMAGE UPLOAD for individual detials  NEEDS TO BE COMPONENT
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
                alert(`Photo Upload Success!`);
                setNewPaint({ ...newPaint, photo: response.data.url });
            }).catch(error => {
                console.log('error', error);
                alert('Something went wrong');
            })
        } else {
            alert('Please select an image');
        }
    }


    // delete entire project function
    function deleteProject(project) {
        console.log(`deleting the entire project - id:`, project);
        // dispatch the delete 
        dispatch({ type: 'DELETE_ENTIRE_PROJECT', payload: project });
        // navigate to /projects
        history.push('/projects');

    }



    // PUT request start for description and main photo
    function editProject() {
        console.log(`editing your project`);

        // pass the object to saga

        // refresh the page

    }

    // PUT request Object keys: description, picture
    // todo need image


    // ! IMAGE CAPTURE NEEDS TO BE A COMPONENT
    // captures new image for main photo display








    return (
        <div id='details-page'>

            <div id='details-header'>
                <h2>{projectDetails.model}</h2>
            </div>

            {/* Project Details: <br /> {JSON.stringify(projectDetails)} */}
            New Paint: {JSON.stringify(newPaint)}
            {/* PAINT DETAILS: {JSON.stringify(paintDetails)} */}

            <div id='details-body'>

                <div id='color-view'>

                    <div id='projectImage-div'>

                        <div>
                            <p key={projectDetails.id}>{projectDetails.description}</p>
                        </div>

                        <img key={projectDetails.id} src={projectDetails.picture} alt="No Photo Uploaded" id='details-photo' />


                    </div>


                    {/* <div>
                        {projectDetails.map((project) =>
                            <h2>{project.primary}</h2>
                        )}
                    </div> */}

                    <div className='detail-palette'>
                        {/* Project Color Display */}
                        <div className="palette-container">
                            <div className="detailThird primary-triad-2"><p>T2</p></div>
                            <div className="detailSecond primary-triad-1"><p>T1</p></div>
                            <div className="detailPrime primary-complement"><p>Comp.</p></div>
                            <div className="detailSecond primary-analog-1"><p>A1</p></div>
                            <div className="detailThird primary-analog-2"><p>A2</p></div>
                        </div>
                        <div className="palette-container">
                            <div className="detailThird primary-twolight"><p>Light</p></div>
                            <div className="detailSecond primary-light"><p>Light</p></div>
                            <div className="detailPrime primary"><p>Prime</p></div>
                            <div className="detailSecond primary-dark"><p>Dark</p></div>
                            <div className="detailThird primary-twodark"><p>Dark</p></div>
                        </div>
                    </div>

                </div>

                <div id='paint-inputs'>

                    <div id='paint-show'>
                        <label><input
                            id='color-select'
                            type='color'
                            disabled
                            // value={paintProject}
                            value={paintProject}
                        // onChange={(e) => setPaintProject(e.target.value)}
                        >
                        </input></label>
                    </div>

                    <div id='paint-dropdowns'>

                        <label>Paint <br /><select
                            name='paints'
                            id='paint-dropdown'
                            // onChange={(e) => setPaintProject(JSON.parse(e.target.value))}
                            // onChange={(e) => setNewPaint({ ...newPaint, paint_id: (JSON.parse(e.target.value))})}
                            onChange={(e) => setMultiple({ ...newPaint, paint_id: (JSON.parse(e.target.value)) })}

                        >
                            {paints.map((paint) =>
                                // <option value={paint.hexcode} key={paint.id}>{paint.paint}</option>
                                <option value={JSON.stringify({ hexcode: paint.hexcode, id: paint.id })} key={paint.id}>{paint.paint}</option>
                            )}
                        </select></label>

                        <label>Technique <br /><select
                            name='techniques'
                            id='technique-dropdown'
                            onChange={newPaintChange('technique_id')}
                        >
                            {techniqueList.map((technique) =>
                                <option value={technique.id} key={technique.id}>{technique.technique}</option>
                            )}
                        </select></label>
                    </div>


                    <div id='upload-detail'>
                        {/* <div id='picture-input'> */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                        {/* </div> */}
                    </div>

                    <div id='add-paint'>
                        <button
                            onClick={addNewPaint}
                            className='btn'
                        >Add Paint</button>

                        <button
                            onClick={() => editProject(projectDetails.id)}
                            id='edit-project'
                            className='btn'
                        >Edit <br /> Project</button>

                        <button
                            onClick={() => deleteProject(projectDetails.id)}
                            id='delete-project'
                            className='btn'
                        >Delete <br /> Project</button>




                    </div>


                </div>



                {/* <div id='paint-modelSteps'> */}

                {/* begin the details item list  */}
                <div id='painted-models'>
                    {paintDetails.map((paint) =>
                        <PaintDetails paint={paint} refreshDetails={refreshDetails} />
                    )}
                </div>
                {/* ! map for the paint details component */}

                {/* </div> */}

            </div>

        </div>
    );
}

export default ProjectDetails;
