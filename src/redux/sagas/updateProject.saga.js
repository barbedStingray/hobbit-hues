
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* updateProject(action) {
    try {
        console.log(`updating your project details saga payload:`, action.payload);
        // todo send updates to server
        yield axios.put(`/api/user/editProject/${action.payload.id}`, action.payload);
        console.log(`past the axios edit`);
        // todo fetch your details again ?? refresh page might do this

    } catch (error) {
      console.log(`error in PUT project details`);
      alert(`something went wrong with the project details update!`);
    }
  }

  function* updateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_DETAILS', updateProject);
  }

  
  export default updateProjectSaga;
