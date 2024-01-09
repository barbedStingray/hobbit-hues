


import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';



// add the new project to the database
function* fetchCommunityProjects() {
    try {
        console.log(`in communitySaga`);
        // GET request for ALL projects
        const projectResults = yield axios.get(`/api/user/community`);
        console.log(`axios success`);
        // dispatch action to set reducer
        yield put({ type: 'SET_COMMUNITY_PROJECTS', payload: projectResults.data });

    } catch (error) {
      console.log(`error in POST createNewProject`);
      alert(`something went wrong, the community could not load!`);
    }
  }

  function* fetchCommunity() {
    yield takeLatest('FETCH_COMMUNITY_PROJECTS', fetchCommunityProjects);
  }

  
  export default fetchCommunity;
