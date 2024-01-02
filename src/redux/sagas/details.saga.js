
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* fetchProjectDetails(action) {
    try {
      // project results data
        const detailResults = yield axios.get(`/api/user/details/${action.payload}`);
        console.log(`detailResults`, detailResults.data);

      // ! project paints data
        const detailPaintResults = yield axios.get(`/api/user/detailPaints/${action.payload}`);
        console.log(`detailPaintResults.data`, detailPaintResults.data);

        // dispatch action to set the reducer for general details
        yield put({ type: 'SET_PROJECT_DETAILS', payload: detailResults.data });
        yield put({ type: 'SET_PAINT_DETAILS', payload: detailPaintResults.data });



    } catch (error) {
      console.log(`error in GET /details/:id`);
      alert(`something went wrong with the details!`);
    }
  }

  function* detailsSaga() {
    yield takeLatest('FETCH_PROJECT_DETAILS', fetchProjectDetails);
  }

  
  export default detailsSaga;
