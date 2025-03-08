import React, { useState, useEffect } from 'react'
import './dataManage.css'
import { generateRealms, convertCamelCase } from '../../components/scripts'

const DataManage = () => {

    const [themeList, setThemeList] = useState([])
    const [realms, setRealms] = useState({})
    const [highlight, setHighlight] = useState(true)

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
                        <p className='realm-item' key={realm.id}>{convertCamelCase(realm.group)}</p>
                    ))}
                </div>
            ) : (
                <div className='realm-add'>
                    <p>LETS ADD REALMS</p>
                    <form>
                    <p>THEME</p>
                    <select onChange={(e) => setTheme(e.target.value)}>
                        <option value=''>Select One...</option>
                        {themeList.map((theme, i) => (
                            <option value={theme} key={i}>{theme}</option>
                        ))}
                    </select>
                    <p>OR</p>
                    <input type='text' onChange={(e) => setTheme(e.target.value)} />
                    <p>AND</p>
                    <p>REALM</p>
                    <input type='text' onChange={(e) => setNewRealm(e.target.value)} />

                        <button type='submit'>SUBMIT</button>
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
