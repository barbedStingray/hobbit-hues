import React from 'react';
import './PaintList.css';



const PaintList = ({ paintDetails }) => {

    
    return (
        <div className='paintList'>
            {paintDetails.map((color, i) => (
                <div className='paintListRow' key={i}>
                    <p>{color.paint}</p>
                    <div className='paintListColor' style={{ backgroundColor: color.hexcode }}></div>
                </div>
            ))}
        </div>
    )
}

export default PaintList
