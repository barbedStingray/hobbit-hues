
// IMPORTS
// middleware
import { useSelector, useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
// css
import './PaintDetails.css';

function PaintDetails({ paint, refreshDetails }) {


    // middleware variables
    const dispatch = useDispatch();
    // redux variables
    const store = useSelector((store) => store);


    // delete single paint
    function deletePaint(paint) {
        console.log(`deleting a single paint ID`, paint);
        // delete single paint
        dispatch({ type: 'DELETE_SINGLE_PAINT', payload: paint });
        // refresh page / passed from props
        refreshDetails();
    }

    // custom motion variable
    const paintDetailsMotion = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };



    return (

        <m.div
            key={'paintMotionDetails'}
            className="paintDetailStep"
            variants={paintDetailsMotion}
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}
        >
            <button
                onClick={() => deletePaint(paint.id)}
                className='btn_sm btn_del'
            >X</button>


            <div className='detailsStepImageDiv'>
                <img src={paint.photo} alt="No Photo Uploaded" className='detailStepImage' />
            </div>

            <div className='detailStepDescription'>

                <div>
                    <p className=''>{paint.paint}</p>
                    <p className=''>{paint.technique}</p>
                    <div className='paintStepColor' style={{ backgroundColor: paint.hexcode }}></div>
                </div>
                <p className='detailNotes'>{paint.notes}</p>

            </div>
        </m.div>
    );
}

export default PaintDetails;
