import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function fetchPaints() {
    const [paintList, setPaintList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [detailStatus, setDetailStatus] = useState('')


    useEffect(() => {
        // * for caching
        // const cachedData = sessionStorage.getItem('paintList')
        // if (cachedData) {
        //     setPaintList(JSON.parse(cachedData))
        //     setIsLoaded(true)
        //     setDetailStatus('')
        //     console.log('FOUND CACHE')
        // } else {
        //     console.log('NO CACHE AVAILABLE')
        //     fetchPaintRequest()
        // }

        fetchPaintRequest()
    }, [])


    async function fetchPaintRequest(recipeID) {
        setDetailStatus('loading')

        try {
            const paintResults = await axios.get('/api/user/paints');
            setPaintList(paintResults.data)
            setIsLoaded(true)
            setDetailStatus('')
            // sessionStorage.setItem('paintList', JSON.stringify(paintResults.data))
        } catch (error) {
            console.log('error in fetching details', error)
            setIsLoaded(false)
            setDetailStatus('error')
        }
    }

    return { paintList, isLoaded, detailStatus }
}
