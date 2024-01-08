
// IMPORTS
// middleware
import { useSelector, useDispatch } from 'react-redux';
import { motion as m } from 'framer-motion';
// css
import './PaintDetails.css';

function PaintDetails(props) {

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
        props.refreshDetails();
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
                className="paintDetailsMotion"
                variants={paintDetailsMotion}
                id='project-paints'>

                <div id='paint-step'>
                    <img key={props.paint.id} src={props.paint.photo} alt="No Photo Uploaded" id='painted-image' className='photo-zoom' />
                    {/* {JSON.stringify(props.paint)} */}
                </div>

                <div id='paint-description'>
                    <div>
                        <h4 className='defaultMargin'>{props.paint.paint}</h4>
                    </div>

                    <div >
                        <p className='defaultMargin'>{props.paint.technique}</p>
                    </div>
                    <div>
                        <p className='defaultMargin'>{props.paint.notes}</p>
                    </div>
                    <div id='paintColor-display'>
                        {/* Displaying the color of the paint! */}
                        <div>
                            <label><input
                                className='color-select'
                                type='color'
                                disabled
                                value={props.paint.hexcode}
                            >
                            </input></label>
                        </div>
                        <div>
                            <button
                                onClick={() => deletePaint(props.paint.id)}
                                className='btn_sm btn_del'
                            >X</button>
                        </div>
                    </div>
                </div>
            </m.div>
    );
}

export default PaintDetails;
