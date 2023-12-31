
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// add the new project to the database
function* createNewProject(action) {
    try {
        console.log(`createNewProject Saga`);
        // console.log(`action.payload`, action.payload);
        // console.log(`action.payload.user_id`, action.payload.user_id);

        // post request
        yield axios.post('/api/user/newProject', action.payload);

        // todo action to fetch projects saga
        yield put({ type: 'FETCH_PROJECTS', payload: action.payload.user_id });

        // todo direct user to the project page


    } catch (error) {
      console.log(`error in POST createNewProject`);
      alert(`something went wrong, your project was not created!`);
    }
  }

  function* createSaga() {
    yield takeLatest('CREATE_NEW_PROJECT', createNewProject);
  }

  
  export default createSaga;
