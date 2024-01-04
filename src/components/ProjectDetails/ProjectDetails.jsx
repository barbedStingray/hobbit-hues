
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

// components
import ImageUpload from '../ImageUpload/ImageUpload.jsx';
import PaintDetails from '../PaintDetails/PaintDetails';



function ProjectDetails() {

    // reducer information
    const store = useSelector((store) => store);
    const paints = useSelector((store) => store.setPaintsDropdown);
    const projectDetails = useSelector((store) => store.projectDetails);
    const techniqueList = useSelector((store) => store.techniqueList);
    const paintDetails = useSelector((store) => store.paintDetails);

    // middleware functions
    const dispatch = useDispatch();
    const history = useHistory();

    // VARIABLES FOR PROJECT DETAILS
    const [paintProject, setPaintProject] = useState('#hexcode'); // POST new paint variable
    const [toggleProject, setToggleProject] = useState(true); // toggle for editing project details
    const { id } = useParams(); // hook for refresh
    // console.log(`useParams ID`, id);

    // variable to post a new paint
    let [newPaint, setNewPaint] = useState({
        project_id: id,
        paint_id: '38',
        technique_id: '1',
        photo: '',
        notes: ''
    });





    // todo This is going to be used to display the selected color palette
    const [detailPalette, setDetailPalette] = useState('projectDetails.primary');
    // toggle for editing the details of the project

    // ?? toggle for editing individual paint details



    // function to set newPaint
    const newPaintChange = (key) => (event) => {
        console.log('changed newProject');
        setNewPaint({ ...newPaint, [key]: event.target.value });
    }
    // set new paint IMAGE FUNCTION
    function newPaintImage(newImage) {
        console.log(`adding the new paint image to the new paint variable`);
        setNewPaint({ ...newPaint, photo: newImage });
    }

    // function to submit new paint post
    function addNewPaint() {
        console.log(`adding new paint`);
        console.log(`newPaint object:`, newPaint);

        // dispatch to POST Saga
        dispatch({ type: 'POST_PROJECT_PAINT', payload: newPaint });

        // clear your inputs
        // setNewPaint({
        //     project_id: id,
        //     paint_id: '38',
        //     technique_id: '1',
        //     photo: '',
        //     notes: ''

        // });    
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
        // setTimeout(setColors(projectDetails.primary), 3000); // cant be here React says no
        // setColors(projectDetails.primary) // cant be here React says no
    }, [id]);

    function setColors(hue) {
        console.log(`hue:`, hue)
        // set your variable
        // if (inputType === 'primary') {
        //   setPalettePrime(H);
        // } else if (inputType === 'secondary') {
        //   setPaletteSecond(H);
        // } else {
        //   console.log(`palette exception`);
        // }
    
        // conversion portion start
        // hex to rgb
        let r = 0, g = 0, b = 0;
        if (hue.length == 4) {
          r = "0x" + hue[1] + hue[1];
          g = "0x" + hue[2] + hue[2];
          b = "0x" + hue[3] + hue[3];
        } else if (hue.length == 7) {
          r = "0x" + hue[1] + hue[2];
          g = "0x" + hue[3] + hue[4];
          b = "0x" + hue[5] + hue[6];
        }
        // rgb to hsl
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
          cmax = Math.max(r, g, b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0;
    
        if (delta == 0)
          h = 0;
    
        else if (cmax == r)
          h = ((g - b) / delta) % 6;
    
        else if (cmax == g)
          h = (b - r) / delta + 2;
    
        else
          h = (r - g) / delta + 4;
    
        h = Math.round(h * 60);
    
        if (h < 0)
          h += 360;
    
        // s + l
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

    
        document.documentElement.style.setProperty(`--primary-color-h`, h);
        document.documentElement.style.setProperty(`--primary-color-s`, s + '%');
        document.documentElement.style.setProperty(`--primary-color-l`, l + '%');
      }
    








    // ! delete project code 
    // delete entire project function
    function deleteProject(project) {
        console.log(`deleting the entire project - id:`, project);
        // dispatch the delete 
        dispatch({ type: 'DELETE_ENTIRE_PROJECT', payload: project });
        // navigate to /projects
        history.push('/projects');

    }




    // ! edit project code
    // toggles the Edit boxes appearances and propagates two buttons 'save' and 'cancel'
    function editProject() {
        console.log(`editing your project`);
        // toggle your edit boxes
        setToggleProject(!toggleProject);
        console.log(`toggle project:`, toggleProject);

        // set your delivery package
        setEditProjectPackage({
            id: id,
            description: `${projectDetails.description}`,
            picture: `${projectDetails.picture}`
        });
    }
    function cancelEdit() {
        setToggleProject(!toggleProject);
    }

    // variable to update project image and description
    const [editProjectPackage, setEditProjectPackage] = useState({
        id: id,
        description: ``,
        picture: ''
    });
    // PUT request start for id, description, and picture
    function saveEdits() {
        console.log(`saving your new edits payload:`, editProjectPackage);
        // dispatch your new information
        dispatch({ type: 'UPDATE_PROJECT_DETAILS', payload: editProjectPackage });
        // refresh the page
        setTimeout(() => refreshDetails(), 250);
        setTimeout(() => setToggleProject(!toggleProject), 250);
    }
    // handles the description change
    const editProjectChange = (key) => (event) => {
        console.log('changed newProject');
        setEditProjectPackage({ ...editProjectPackage, [key]: event.target.value });
    }
    // prepares new picture for PUT request, props of ImageUpdate component
    function editProjectPicture(properties) {
        setEditProjectPackage({ ...editProjectPackage, picture: properties });
    }














    return (
        <div id='details-page'>

            <div id='details-header'>
                <h2>{projectDetails.model}</h2>
            </div>

            Project Details: <br /> {JSON.stringify(projectDetails)}
            {/* PAINT DETAILS: {JSON.stringify(paintDetails)} */}

            <div id='details-body'>

                <div id='color-view'>

                    <div id='projectImage-div'>

                        {toggleProject === true ?
                            <div>
                                <p key={projectDetails.id}>{projectDetails.description}</p>
                            </div>
                            :
                            <div>
                                <textarea
                                    onChange={editProjectChange('description')}
                                    id='createDescription-input'
                                    value={editProjectPackage.description}
                                >
                                </textarea>
                                {JSON.stringify(editProjectPackage)}
                            </div>
                        }

                        {toggleProject === true ?
                            <img key={projectDetails.id} src={projectDetails.picture} alt="No Photo Uploaded" id='details-photo' />
                            :
                            <ImageUpload photoFunction={editProjectPicture} />
                        }


                    </div>


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
                        {projectDetails.primary}

                    </div>

                </div>

                <div id='paint-inputs'>

                    <div id='paint-show'>
                        <label><input
                            id='color-select'
                            type='color'
                            disabled
                            value={paintProject}
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


                            {/* !! Adding new TEXT AREA for NOTES */}
                        </select></label>

                        <label><textarea
                            name='notes'
                            onChange={newPaintChange('notes')}
                            placeholder='paint notes here...'
                        ></textarea></label>




                        {/* New Paint: {JSON.stringify(newPaint)} */}




                    </div>

                    {/* image upload for new paint addition */}
                    <ImageUpload photoFunction={newPaintImage} />

                    <div id='add-paint'>
                        <button
                            onClick={addNewPaint}
                            className='btn'
                        >Add Paint</button>

                        {/* Toggle Buttons to Edit Project */}
                        {toggleProject === true ?
                            <button
                                onClick={() => editProject(projectDetails.id)}
                                id='edit-project'
                                className='btn'
                            >Edit <br /> Project</button>
                            :
                            <>
                                <button onClick={cancelEdit}>Cancel</button>
                                <button onClick={saveEdits}>Save</button>
                            </>
                        }

                        <button
                            onClick={() => deleteProject(projectDetails.id)}
                            id='delete-project'
                            className='btn'
                        >Delete <br /> Project</button>




                    </div>


                </div>


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
