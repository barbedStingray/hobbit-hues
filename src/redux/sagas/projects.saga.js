

import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';



// add the new project to the database
function* fetchUserProjects(action) {
    try {
        // GET request for users projects
        const projectResults = yield axios.get(`/api/user/projects`);
        // dispatch action to set reducer
        yield put({ type: 'SET_USER_PROJECTS', payload: projectResults.data });

    } catch (error) {
      // console.log(`error in POST createNewProject`);
      alert(`something went wrong, your project list was not generated!`);
    }
  }

  function* fetchProjects() {
    yield takeLatest('FETCH_PROJECTS', fetchUserProjects);
  }

  
  export default fetchProjects;
