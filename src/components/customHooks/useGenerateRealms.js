import { useState, useEffect } from 'react'
import axios from 'axios'


const useGenerateRealms = (refreshKey) => {
    const [worldList, setWorldList] = useState([])
    const [realmList, setRealmList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [detailStatus, setDetailStatus] = useState('')

    useEffect(() => {
        fetchThemesandRealms()
    }, [refreshKey])

    async function fetchThemesandRealms() {
        // console.log('fetching worlds and realms')
        try {
            const { data: realmResults } = await axios.get('/api/user/realms')
            const { data: worldResults } = await axios.get('/api/user/world')
            const uniqueWorlds = worldResults.map( world => world.world)
            // console.log('results', realmResults, uniqueWorlds)
            setWorldList(uniqueWorlds)
            setRealmList(realmResults)

        } catch (error) {
            alert('Error in fetching worlds/realms')
            console.log('Error fetching realms:', error)
        }
    }
    return { worldList, realmList }
}

export default useGenerateRealms