import { useState, useEffect } from 'react'
import axios from 'axios'


const useGenerateRealms = (refreshKey) => {
    const [themeList, setThemeList] = useState([])
    const [realmList, setRealmList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [detailStatus, setDetailStatus] = useState('')

    useEffect(() => {
        fetchThemesandRealms()
    }, [refreshKey])

    async function fetchThemesandRealms() {
        // console.log('fetching themes and realms')
        try {
            const { data: results } = await axios.get('/api/user/realms')
            // console.log('results', results)
            // Get unique themes
            const themeData = [...new Set(results.map(item => item.theme))]
            // console.log('themeData', themeData)
            // Function to get realms by theme
            const getGroupsByTheme = (attributes, theme) => {
                // console.log('attributes', attributes)
                return attributes
                    .filter(item => item.theme === theme)  // Filter by theme
                    .map(item => ({ id: item.id, group: item.group }))  // Extract id and group
                    .filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.id === value.id && t.group === value.group
                        )))  // Ensure uniqueness
            }

            let fetchedRealms = {}
            // Loop over each theme and set it as a key in the realms object
            themeData.forEach(theme => {
                fetchedRealms[theme] = getGroupsByTheme(results, theme)
            })
            // console.log('realms', realms)

            // Set the state with the grouped realms by theme
            setThemeList(themeData)
            setRealmList(fetchedRealms)

        } catch (error) {
            alert('Error in fetching realms')
            console.log('Error fetching realms:', error)
        }
    }

    return { themeList, realmList }
}

export default useGenerateRealms