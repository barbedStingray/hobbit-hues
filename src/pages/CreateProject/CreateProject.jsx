import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx';
import './CreateProject.css';
import handleObjectChange from '../../scripts/handleObjectChange.js';



function CreateProject() {

    const [themes, setThemes] = useState([])
    const [lotrRealms, setLotrRealms] = useState([])
    const [swRealms, setSwRealms] = useState([])

    const [newMini, setNewMini] = useState({
        model: '',
        theme: '',
        rank: 0,
        picture: ''
    });
    console.log('newMini', newMini);

    useEffect(() => {
        // * I want this loaded before you go to the page
        generateRealms()
    }, [])


    const generateRealms = async () => {
        console.log('fetching realms from categories')
        try {
            const { data: realms } = await axios.get('/api/user/realms ')
            console.log('realms', realms)

            const themeData = [...new Set(realms.map(item => item.theme))]

            const getGroupsByTheme = (attributes, theme) => {
                console.log('attributes', attributes)
                return attributes
                    .filter(item => item.theme === theme)  // Filter by theme
                    .map(item => ({ id: item.id, group: item.group }))  // Extract id and group
                    .filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.id === value.id && t.group === value.group
                        )));  // Ensure uniqueness
            }
            const starWarsGroup = getGroupsByTheme(realms, 'starWars')
            const lotrGroup = getGroupsByTheme(realms, 'lordOfTheRings')

            setThemes(themeData)
            setLotrRealms(lotrGroup)
            setSwRealms(starWarsGroup)

        } catch (error) {
            alert('error in fetching attributes')
            console.log('error attributes', error)
        }
    }



    const [selectedRealms, setSelectedRealms] = useState([]);
    console.log('selectedRealms', selectedRealms)
    const handleRealmChange = (e) => {
        const { value, checked } = e.target;
        const realmId = Number(value); // needed if value is a string - which it is
        setSelectedRealms((prevSelected) =>
            checked ? [...prevSelected, realmId] : prevSelected.filter(id => id !== realmId)
        );
    };

    const createNewMini = async (e) => {
        e.preventDefault()
        try {
            if (newMini.picture === '') return alert('please attatch a photo')

            await axios.post('/api/user/newMini', { newMini: newMini, realms: selectedRealms });
            alert('successfully added new mini!')
            // todo fetch projects reducer
            console.log('success in posting a new mini!')
            // todo navigate to minis page for editing: optional
            // resets
            setNewMini({
                model: '',
                theme: '',
                rank: 0,
                picture: ''
            });
            setSelectedRealms([]);
        } catch (error) {
            console.log(`error in POST createNewMini`);
            alert(`The Hobbits were taken to Isengard, your project was not created! Sorry, Try again.`);
        }
    }

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


    function convertCamelCase(camelCaseStr) {
        // Insert a space before each uppercase letter, then capitalize the first letter of each word
        return camelCaseStr
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Add a space between lowercase and uppercase letters
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
    }
    
    // Example usage:
    const camelCaseString = "camelCaseExample";
    console.log(convertCamelCase(camelCaseString)); // "Camel Case Example"
    


    return (
        <div className="create-projects">

            <p className='pageHeading'>Fresh Paint</p>

            <form className='newProjectForm' onSubmit={createNewMini}>

                <input
                    name='model'
                    required
                    value={newMini.model}
                    className='model-name'
                    onChange={(e) => handleObjectChange(e, setNewMini, newMini)}
                    type='text'
                    placeholder='Model Name...'
                >
                </input>


                <div className='form-meat'>

                    <div className='model-inputs'>

                        <select className='select-style select-theme' required name='theme' value={newMini.theme} onChange={(e) => handleObjectChange(e, setNewMini, newMini)}>
                            <option value="">Pick a Theme</option>
                            {themes.map((theme, i) => (
                                <option key={i} value={theme}>
                                    {convertCamelCase(theme)}
                                </option>
                            ))}
                        </select>

                        <select className='select-style select-rank' required name='rank' value={newMini.rank} onChange={(e) => handleObjectChange(e, setNewMini, newMini)}>
                            <option value="">Quality...</option>
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        <ImageUpload photoFunction={setNewProjectImageUp} />
                        <div className='photoUploadDiv'>
                            {newMini.picture && <img className='uploadImage' src={newMini.picture} />}
                        </div>

                    </div>

                    <div className='model-labels'>
                        <div className="realmsContainer">
                        <p>Select Realms:</p>
                            {realmsToShow().map((realm) => (
                                <label key={realm.id}>
                                    <input
                                        type="checkbox"
                                        value={realm.id}
                                        checked={selectedRealms.includes(realm.id)}
                                        onChange={handleRealmChange}
                                    />
                                    {convertCamelCase(realm.group)}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <button type='submit' className="btn">Create!</button>
            </form>

        </div>
    );
}

export default CreateProject;
