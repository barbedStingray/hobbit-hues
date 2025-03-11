import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
import './minisPage.css'


function MinisPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        // setProjectList();
        // dispatch({ type: fetchProjectsAction });
    }, [])


    return (

        <div className="minis-page">

            {/* <p className='pageHeading'>Miniatures</p> */}

            <div className='minis-display'>
                {/* {projects.map((project) =>
                    <p>Hello</p>
                )} */}
                <div className='placeholder'>
                    <div className='mini-image'></div>
                    <div className='mini-info'>
                        <p>Mini Title</p>
                        <p>Mini Quality</p>
                    </div>
                </div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
            </div>

            <div className='filter-menu'>

            </div>

        </div>

    );
}

export default MinisPage;
