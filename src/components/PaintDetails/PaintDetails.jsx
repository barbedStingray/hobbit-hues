
import { useSelector } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PaintDetails(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);

    return (
        <div id='project-paints'>
            <div id='paint-step'>
                <img key={props.paint.id} src={props.paint.photo} alt="No Photo Uploaded" id='painted-image' />
            </div>

            <div id='paint-description'>
                <div>
                    <p>{props.paint.paint}</p>
                </div>
                <div>
                    <p>{props.paint.technique}</p>
                </div>
                <div id='paint-box'>
                    {/* <p>color box</p> */}
                </div>

            </div>

            <div id='paint-delete'>
                    <button id='delete-paint'>X</button>
            </div>
        </div>
    );
}

export default PaintDetails;
