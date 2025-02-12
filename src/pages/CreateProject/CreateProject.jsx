

// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
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

    const [themes, setThemes] = useState([])
    const [lotrRealms, setLotrRealms] = useState([])
    const [swRealms, setSwRealms] = useState([])

    let [newMini, setNewMini] = useState({
        model: '',
        theme: '',
        realms: [],
        rank: 0,
        picture: ''
    });
    console.log('newMini', newMini);










    useEffect(() => {
        getMiniAttributes()
    }, [])

    const getMiniAttributes = async () => {
        console.log('fetching fill ins')
        try {
            const { data: attributes } = await axios.get('/api/user/attributes ')
            console.log('attributes', attributes)

            const themeData = [...new Set(attributes.map(item => item.theme))];

            const getGroupsByTheme = (attributes, theme) => {
                return attributes
                    .filter(item => item.theme === theme)  // Filter by theme
                    .map(item => ({ id: item.id, group: item.group }))  // Extract id and group
                    .filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.id === value.id && t.group === value.group
                        )));  // Ensure uniqueness
            };
            const starWarsGroup = getGroupsByTheme(attributes, 'starWars')
            const lotrGroup = getGroupsByTheme(attributes, 'lordOfTheRings')

            setThemes(themeData)
            setLotrRealms(lotrGroup)
            setSwRealms(starWarsGroup)

        } catch (error) {
            alert('error in fetching attributes')
            console.log('error attributes', error)
        }
    }


    const handleRealmChange = (e) => {
        const { value, checked } = e.target;
        const realmId = Number(value);
    
        setNewMini((prevMini) => ({
            ...prevMini,
            realms: checked
                ? [...prevMini.realms, realmId] // Add realm if checked
                : prevMini.realms.filter(id => id !== realmId) // Remove if unchecked
        }));
    };



    const realmsToShow = () => {
        switch (newMini.theme) {
            case 'starWars':
                return swRealms;
            case 'lordOfTheRings':
                return lotrRealms;
            default:
                return []
        }
    }






    // ** Functions ************


    function setNewProjectImageUp(properties) {
        setNewMini({ ...newMini, picture: properties });
    }

    // Create your new project - submit your form!
    function createProject(e) {
        e.preventDefault();
        dispatch({ type: 'CREATE_NEW_PROJECT', payload: newMini });
        navigate('/projects');
    }




    return (

        <m.div
            key={'createMotionProject'}
            className="createProjectPage"
            initial="hidden"
            transition={{ duration: 0.55, ease: 'easeOut' }}
            animate="visible"
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
        >

            <p className='pageHeading'>Create A Project!</p>
            <form className='newProjectForm'>

                <input
                    name='model'
                    className='newProjectNameInput'
                    onChange={(e) => handleObjectChange(e, setNewMini, newMini)}
                    type='text'
                    placeholder='Model Name Here...'
                >
                </input>

                <select name='theme' value={newMini.theme} onChange={(e) => handleObjectChange(e, setNewMini, newMini)}>
                    <option value="">Choose Category</option>
                    {themes.map((theme, i) => (
                        <option key={i} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>

                <select name='rank' value={newMini.rank} onChange={(e) => handleObjectChange(e, setNewMini, newMini)}>
                    <option value="">Select Rank</option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>

                <div className="realmsContainer">
                    <p>Select Realms:</p>
                    {realmsToShow().map((realm) => (
                        <label key={realm.id}>
                            <input
                                type="checkbox"
                                value={realm.id}
                                checked={newMini.realms.includes(realm.id)}
                                onChange={handleRealmChange}
                            />
                            {realm.group}
                        </label>
                    ))}
                </div>


                <ImageUpload photoFunction={setNewProjectImageUp} />

                <div className='photoUploadDiv'>
                    {
                        newMini.picture === '' ? (
                            <></>
                        ) : (
                            <img className='uploadImage' src={newMini.picture} />
                        )
                    }
                </div>

                <button onClick={createProject} className="btn">Create!</button>

            </form>

        </m.div>
    );
}

export default CreateProject;
