import axios from 'axios'


export function convertCamelCase(camelCaseStr) {
    // Insert a space before each uppercase letter, then capitalize the first letter of each word
    return camelCaseStr
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Add a space between lowercase and uppercase letters
        .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
}



export const generateRealms = async (setRealms, setThemeList) => {
    console.log('fetching realms from categories')
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

        let realms = {}
        // Loop over each theme and set it as a key in the realms object
        themeData.forEach(theme => {
            realms[theme] = getGroupsByTheme(results, theme)
        })
        // console.log('realms', realms)

        // Set the state with the grouped realms by theme
        setRealms(realms)
        setThemeList(themeData)

    } catch (error) {
        alert('Error in fetching realms')
        console.log('Error fetching realms:', error)
    }
}