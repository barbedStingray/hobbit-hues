import { useState, useEffect } from 'react'
import axios from 'axios'


const useGenerateRealms = (refreshKey) => {
    const [worldList, setWorldList] = useState([])
    const [realmObject, setRealmObject] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [detailStatus, setDetailStatus] = useState('')

    useEffect(() => {
        fetchThemesandRealms()
    }, [refreshKey])

    async function fetchThemesandRealms() {
        // console.log('fetching themes and realms')
        try {
            const { data: results } = await axios.get('/api/user/themes')
            // console.log('results', results)

            // Get unique themes
            const uniqueWorlds = [...new Set(results.map(item => item.world))]
            uniqueWorlds.sort()  // Sort alphabetically

            const getGroupsByTheme = (attributes, world) => {
                // console.log('attributes', attributes)
                return attributes
                    .filter(item => item.world === world)
                    .map(item => ({ id: item.id, realm: item.realm }))
                    .filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.id === value.id && t.realm === value.realm
                        )))  // Ensure uniqueness
            }

            let fetchedThemes = {}
            // Loop over each theme and set it as a key in the realms object
            uniqueWorlds.forEach(world => {
                fetchedThemes[world] = getGroupsByTheme(results, world)
            })
            // console.log('fetchedThemes', fetchedThemes)

            // Set the state with the grouped realms by theme
            setWorldList(uniqueWorlds)
            setRealmObject(fetchedThemes)

        } catch (error) {
            alert('Error in fetching realms')
            console.log('Error fetching realms:', error)
        }
    }
    return { worldList, realmObject }
}

export default useGenerateRealms