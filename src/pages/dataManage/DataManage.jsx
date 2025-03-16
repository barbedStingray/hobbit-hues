import React, { useState } from 'react'
import './dataManage.css'
import axios from 'axios'
import { convertCamelCase } from '../../components/scripts'
import useGenerateRealms from '../../components/customHooks/useGenerateRealms'

const DataManage = () => {

    const [refreshKey, setRefreshKey] = useState(0)
    const { worldList, realmList } = useGenerateRealms(refreshKey)

    const [dataToggle, setDataToggle] = useState(true)
    const [newTheme, setNewTheme] = useState('')
    const [newRealm, setNewRealm] = useState('')


    const submitNewRealm = (e) => {
        e.preventDefault()
        // console.log('submitting new realm', newTheme, newRealm)
        try {
            axios.post('/api/user/newRealm', { theme: newTheme, realm: newRealm })
            alert('success in new theme and/or realm!')
            setRefreshKey(prevKey => prevKey + 1)

        } catch {
            console.log(`error in POST new themes/realm`);
            alert(`something went wrong`)
        } finally {

        }
    }

    const deleteRealm = async (id, group) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the realm, ${convertCamelCase(group)}?`);
        if (!confirmDelete) return;

        console.log('delete realm:', id);
        try {
            await axios.delete(`/api/user/deleteRealm/${id}`)
            alert('success in deletion!')
            setRefreshKey(prevKey => prevKey + 1)
        } catch {
            console.log('error in deleting realm')
            alert('something went wrong')
        }
    }

    // todo manually set new colors for different themes?
    function colorCodeThemes(theme) {
        switch (theme) {
            case 'lordOfTheRings':
                return '#86c1775e'
            case 'starWars':
                return '#78c7ff5e'
            default:
                return '#ffffff93'
        }
    }


    return (
        <div className='data-manage'>
            <p className='pageHeading'>Manage Realms</p>

            <div className='toggle-view'>
                <div onClick={() => setDataToggle(!dataToggle)} className={dataToggle ? 'highlight' : 'non-highlight'}>
                    <p>REALMS</p>
                </div>
                <div onClick={() => setDataToggle(!dataToggle)} className={dataToggle ? 'non-highlight' : 'highlight'}>
                    <p>ADD</p>
                </div>
            </div>


            {dataToggle ? (
                <div className='realm-view'>
                    {realmList.map((realm, i) => (
                        <p
                            className='realm-item'
                            key={realm.id}
                            onClick={() => deleteRealm(realm.id, realm.realm)}
                        >
                            {convertCamelCase(realm.realm)}
                        </p>
                    ))}
                </div>
            ) : (
                <div className='realm-add'>
                    <form onSubmit={submitNewRealm} className='realm-form'>
                        <select onChange={(e) => setNewTheme(e.target.value)} className='select-style realm-style'>
                            <option value=''>Use Existing theme...</option>
                            {worldList.map((theme, i) => (
                                <option value={theme} key={i}>{theme}</option>
                            ))}
                        </select>
                        <p>OR</p>
                        <input type='text' onChange={(e) => setNewTheme(e.target.value)} className='select-style' placeholder='Create New Theme...' />
                        <p>AND</p>
                        <input type='text' onChange={(e) => setNewRealm(e.target.value)} className='select-style' placeholder='Add a New Realm...' />

                        <button type='submit' className='btn'>SUBMIT</button>
                    </form>

                    <div className='important-note'>
                        <p>Themes and Realms MUST be entered in camel case to be put into the database. This is how they are extracted and referenced by galleryData.js in stingray scenics</p>
                    </div>
                </div>
            )}


        </div>
    )
}

export default DataManage
