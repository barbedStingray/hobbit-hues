
import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';



// add the new project to the database
function* createNewProject(action) {
  try {
    // post request
    yield axios.post('/api/user/newProject', action.payload);
    // fetch projects saga
    yield put({ type: 'FETCH_PROJECTS', payload: action.payload.user_id });

  } catch (error) {
    // console.log(`error in POST createNewProject`);
    alert(`The Hobbits were taken to Isengard, your project was not created! Sorry, Try again.`);
  }
}

function* createSaga() {
  yield takeLatest('CREATE_NEW_PROJECT', createNewProject);
}

export default createSaga;
