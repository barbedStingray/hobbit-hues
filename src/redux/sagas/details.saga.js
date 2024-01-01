
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* fetchProjectDetails(action) {
    try {
        const detailResults = yield axios.get(`/api/user/details/${action.payload}`);
        console.log(`detailResults`, detailResults.data);

        // dispatch action to set the reducer
        yield put({ type: 'SET_PROJECT_DETAILS', payload: detailResults.data });

    } catch (error) {
      console.log(`error in GET /details/:id`);
      alert(`something went wrong with the details!`);
    }
  }

  function* detailsSaga() {
    yield takeLatest('FETCH_PROJECT_DETAILS', fetchProjectDetails);
  }

  
  export default detailsSaga;
