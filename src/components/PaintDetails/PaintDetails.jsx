
import { useSelector, useDispatch } from 'react-redux';

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
            dispatch({ type: 'DELETE_SINGLE_PAINT', payload: paint});
            // todo refresh page / passed from props
            props.refreshDetails();
        }
    

    return (
        <div id='project-paints'>
            <div id='paint-step'>
                <img key={props.paint.id} src={props.paint.photo} alt="No Photo Uploaded" id='painted-image' className='photo-zoom' />
            </div>

            <div id='paint-description'>
                <div>
                    <p>{props.paint.technique}</p>
                </div>
                <div>
                    <p>{props.paint.paint}</p>
                </div>

                <div id='paint-box'>
                    {/* <p>color box</p> */}
                </div>

            </div>

            <div id='paint-delete'>
                    <button 
                        onClick={() => deletePaint(props.paint.id)} 
                        id='delete-paint'
                        className='btn'
                    >X</button>
            </div>
        </div>
    );
}

export default PaintDetails;
