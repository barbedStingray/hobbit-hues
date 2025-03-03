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
            if(newMini.picture === '') {
                return alert('please attatch a photo')
            }
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
            <form className='newProjectForm' onSubmit={createNewMini}>

                <input
                    name='model'
                    required
                    value={newMini.model}
                    className='newProjectNameInput'
                    onChange={(e) => handleObjectChange(e, setNewMini, newMini)}
                    type='text'
                    placeholder='Model Name Here...'
                >
                </input>

                <select required name='theme' value={newMini.theme} onChange={(e) => handleObjectChange(e, setNewMini, newMini)}>
                    <option value="">Choose Category</option>
                    {themes.map((theme, i) => (
                        <option key={i} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>

                <select required name='rank' value={newMini.rank} onChange={(e) => handleObjectChange(e, setNewMini, newMini)}>
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
                                checked={selectedRealms.includes(realm.id)}
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

                <button type='submit' className="btn">Create!</button>

            </form>

        </m.div>
    );
}

export default CreateProject;
