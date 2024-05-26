
// IMPORTS
// middleware
import { useHistory } from 'react-router-dom';
import { motion as m } from 'framer-motion';
// css
import './CommunityItem.css';



function CommunityItem({ project }) {

    // middleware variables
    const history = useHistory();

    const { id, model, username, picture } = project;

    // custom motion variable
    const singleCommunityItem = {
        hidden: { opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    // takes user to project details page
    function communityDetails(project) {
        history.push(`/communityDetail/${id}`);
    }



    return (

        <m.div
            key={'singleMotionCommunityItem'}
            className="communityItem"
            variants={singleCommunityItem}
            exit={{
                opacity: 0,
                transition: { duration: 0.5 }
            }}

            onClick={() => communityDetails(project)}>

            {/* <div>
                <h4 className='defaultMargin'>{model}</h4>
            </div> */}

            {/* <div>
                <h4 className='defaultMargin'>{username}</h4>
            </div> */}

            <img src={picture} alt="No Photo Uploaded" className='projectPagePhoto' />

        </m.div>
    );
}

export default CommunityItem;
