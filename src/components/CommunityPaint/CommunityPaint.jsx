

// IMPORTS
// middleware
import { motion as m } from 'framer-motion';
// css
import './CommunityPaint.css';

function CommunityPaint(props) {

    // custom motion variable
    const paintCommunityDetailsMotion = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };


    return (

            <m.div
                key={'paintMotionCommunityPaints'}
                className="paintDetailsMotion"
                variants={paintCommunityDetailsMotion}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.5 }
                }}
                id='community-paints'>

                <div id='paintCommunity-step'>
                    <img key={props.paint.id} src={props.paint.photo} alt="No Photo Uploaded" id='painted-image' className='photo-zoom' />
                </div>

                <div id='paintCommunity-description'>
                    <div>
                        <h4 className='defaultMargin'>{props.paint.paint}</h4>
                    </div>

                    <div >
                        <p className='defaultMargin'>{props.paint.technique}</p>
                    </div>
                    <div>
                        <p className='defaultMargin'>{props.paint.notes}</p>
                    </div>
                    <div id='paintColor-Communitydisplay'>
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
                    </div>
                </div>
            </m.div>
    );
}

export default CommunityPaint;
