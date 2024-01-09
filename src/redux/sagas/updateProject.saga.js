
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';



// fetching the paints table from database
function* updateProject(action) {
    try {
        yield axios.put(`/api/user/editProject/${action.payload.id}`, action.payload);

    } catch (error) {
      // console.log(`error in PUT project details`);
      alert(`something went wrong with the project details update!`);
    }
  }

  function* updateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_DETAILS', updateProject);
  }
  
  export default updateProjectSaga;
