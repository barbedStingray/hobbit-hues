import { combineReducers } from 'redux';
import setPaintsDropdown from './paint.reducer';
// import hexcode from './hexcode.reducer';
import userProjects from './projects.reducer';
import projectDetails from './details.reducer';
import techniqueList from './technique.reducer';
import paintDetails from './paintList.reducer';
import communityProjects from './community.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga


// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({

  // ** NEW REDUCERS
  setPaintsDropdown, // sets the list of server side paints
  // hexcode, // passes the hexcode from user page to create project page
  userProjects, // container for user projects
  projectDetails, // contains data for project details page
  techniqueList, // contains server technique list
  paintDetails, // contains paint details of individual projects
  communityProjects, // contains the communities projects
  
});

export default rootReducer;
