
import { useSelector, useDispatch } from 'react-redux';

import './PaintDetails.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PaintDetails(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);

    const dispatch = useDispatch();


    // delete single paint
    function deletePaint(paint) {
        console.log(`deleting a single paint ID`, paint);
        // delete single paint
        dispatch({ type: 'DELETE_SINGLE_PAINT', payload: paint });
        // todo refresh page / passed from props
        props.refreshDetails();
    }


    return (
        <div id='project-paints'>
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
        </div>
    );
}

export default PaintDetails;