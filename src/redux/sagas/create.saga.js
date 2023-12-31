
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// add the new project to the database
function* createNewProject(action) {
    try {
        console.log(`createNewProject Saga`);
        console.log(`action.payload`, action.payload);

        // post request
        yield axios.post('/api/user/newProject', action.payload);

        // fetch request to update the project lists

    } catch (error) {
      console.log(`error in POST createNewProject`);
      alert(`something went wrong, your project was not created!`);
    }
  }

  function* createSaga() {
    yield takeLatest('CREATE_NEW_PROJECT', createNewProject);
  }

  
  export default createSaga;
