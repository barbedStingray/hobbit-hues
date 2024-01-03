

import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* deleteProject(action) {
    try {
        console.log(`in saga for /deleteProject`);
        yield axios.delete(`/api/user/projectDelete/${action.payload}`);

        console.log(`past the yield for the deleteProject`);


    } catch (error) {
      console.log(`error in DELETE /projectDelete/:id`);
      alert(`your entire project was not deleted!`);
    }
  }

  function* deleteProjectSaga() {
    yield takeLatest('DELETE_ENTIRE_PROJECT', deleteProject);
  }

  
  export default deleteProjectSaga;
