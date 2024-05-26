import React from 'react'

const PaintList = ({ paintDetails }) => {
    return (
        <div>
            {paintDetails.map((color, i) => (
                <p key={i}>{color.paint}</p>
            ))}
        </div>
    )
}

export default PaintList
