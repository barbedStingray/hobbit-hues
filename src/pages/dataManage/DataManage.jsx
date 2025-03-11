import React, { useState, useEffect } from 'react'
import './dataManage.css'
import { generateRealms, convertCamelCase } from '../../components/scripts'

const DataManage = () => {

    // lists
    const [themeList, setThemeList] = useState([])
    const [realms, setRealms] = useState({})
    const [highlight, setHighlight] = useState(true)

    // new inputs
    const [theme, setTheme] = useState('')
    const [newRealm, setNewRealm] = useState('')
    console.log('theme', theme)
    console.log('newRealm', newRealm)

    useEffect(() => {
        // ? I want this loaded before you go to the page - reducer?
        generateRealms(setRealms, setThemeList)
    }, [])

    const allRealms = Object.values(realms).flatMap(theme => theme.map(realm => ({ id: realm.id, group: realm.group })))
        .sort((a, b) => a.group.localeCompare(b.group))
    // console.log('allRealms', allRealms)


    const submitNewRealm = (e) => {
        e.preventDefault()
        console.log('submitting new realm')

        // todo axios request for new realm
        // todo alert as completed
    }

    const deleteRealm = (id, group) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the realm, ${convertCamelCase(group)}?`);
        if (!confirmDelete) return;

        console.log('delete realm:', id);
        // todo: delete the realm
    }

    return (
        <div className='data-manage'>
            <p className='pageHeading'>Manage Realms</p>

            <div className='toggle-view'>
                <div onClick={() => setHighlight(!highlight)} className={highlight ? 'highlight' : 'non-highlight'}>
                    <p>REALMS</p>
                </div>
                <div onClick={() => setHighlight(!highlight)} className={highlight ? 'non-highlight' : 'highlight'}>
                    <p>ADD</p>
                </div>
            </div>


            {highlight ? (
                <div className='realm-view'>
                    {allRealms.map((realm, i) => (
                        <p onClick={() => deleteRealm(realm.id, realm.group)} className='realm-item' key={realm.id}>{convertCamelCase(realm.group)}</p>
                    ))}
                </div>
            ) : (
                <div className='realm-add'>
                    <form onSubmit={submitNewRealm} className='realm-form'>
                        <select onChange={(e) => setTheme(e.target.value)} className='select-style realm-style'>
                            <option value=''>Use Existing theme...</option>
                            {themeList.map((theme, i) => (
                                <option value={theme} key={i}>{theme}</option>
                            ))}
                        </select>
                        <p>OR</p>
                        <input type='text' onChange={(e) => setTheme(e.target.value)} className='select-style' placeholder='Create New Theme...' />
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
