import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx';
import './CreateProject.css';
import handleObjectChange from '../../scripts/handleObjectChange.js';
import { convertCamelCase } from '../../components/scripts.js';
import useGenerateRealms from '../../components/customHooks/useGenerateRealms.js';

function CreateProject() {

    const { worldList, realmObject } = useGenerateRealms()
    console.log('worldList-realmList', worldList, realmObject)

    const [world, setWorld] = useState('')


    const [newMini, setNewMini] = useState({
        model: '',
        world: '',
        paint_quality: 0,
        date: '',
        picture: ''
    })
    console.log('newMini', newMini);
    const [selectedRealms, setSelectedRealms] = useState([]);
    // console.log('selectedRealms', selectedRealms)


    const handleRealmChange = (e) => {
        const { value, checked } = e.target
        const realmId = Number(value) // needed if value is a string - which it is
        setSelectedRealms((prevSelected) =>
            checked ? [...prevSelected, realmId] : prevSelected.filter(id => id !== realmId)
        )
    }

    const createNewMini = async (e) => {
        e.preventDefault()
        try {
            if (newMini.picture === '') return alert('please attatch a photo')

            await axios.post('/api/user/newMini', { newMini: newMini, realms: selectedRealms })
            alert('successfully added new mini!')
            // todo fetch projects reducer
            console.log('success in posting a new mini!')
            // todo navigate to minis page for editing: optional
            // resets
            setNewMini({
                model: '',
                world: '',
                paint_quality: 0,
                date: '',
                picture: ''
            })
            setSelectedRealms([])
        } catch (error) {
            console.log(`error in POST createNewMini`);
            alert(`The Hobbits were taken to Isengard, your project was not created! Sorry, Try again.`)
        }
    }

    function setNewProjectImageUp(properties) {
        setNewMini({ ...newMini, picture: properties })
    }



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

                        <select
                            className='select-style select-theme'
                            required
                            name='world'
                            value={newMini.world}
                            onChange={(e) => {
                                handleObjectChange(e, setNewMini, newMini)
                                setWorld(e.target.value)
                            }}
                        >
                            <option value={null}>Pick a Theme</option>
                            {worldList.map((world, i) => (
                                <option key={i} value={world}>
                                    {convertCamelCase(world)}
                                </option>
                            ))}
                        </select>

                        <input
                            name='date'
                            required
                            value={newMini.date}
                            className='model-name'
                            onChange={(e) => handleObjectChange(e, setNewMini, newMini)}
                            type='text'
                            placeholder='date painted...'
                        >
                        </input>


                        <select className='select-style select-rank' required name='paint_quality' value={newMini.paint_quality} onChange={(e) => handleObjectChange(e, setNewMini, newMini)}>
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
                            {realmObject[world]?.map((item) => (
                                <label key={item.id}>
                                    <input
                                        type="checkbox"
                                        value={item.id}
                                        checked={selectedRealms.includes(item.id)}
                                        onChange={handleRealmChange}
                                    />
                                    {convertCamelCase(item.realm)}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <button type='submit' className="btn">Create!</button>
            </form>

        </div>
    )
}

export default CreateProject