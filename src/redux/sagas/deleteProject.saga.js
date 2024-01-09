

import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';


// delete an entire project
function* deleteProject(action) {
  try {
    yield axios.delete(`/api/user/projectDelete/${action.payload}`);

  } catch (error) {
    // console.log(`error in DELETE /projectDelete/:id`);
    alert(`Sorry, your project was not deleted.`);
  }
}

function* deleteProjectSaga() {
  yield takeLatest('DELETE_ENTIRE_PROJECT', deleteProject);
}


export default deleteProjectSaga;
