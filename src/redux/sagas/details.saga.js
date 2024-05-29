
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* fetchProjectDetails(action) {
  try {
    // project results data
    const detailResults = yield axios.get(`/api/user/details/${action.payload}`);
    // project paints data
    const detailPaintResults = yield axios.get(`/api/user/detailPaints/${action.payload}`);
    // dispatch actions to set the reducers
    yield put({ type: 'SET_PROJECT_DETAILS', payload: detailResults.data });
    yield put({ type: 'SET_PAINT_DETAILS', payload: detailPaintResults.data });


  } catch (error) {
    // console.log(`error in GET /details/:id`);
    alert(`Sorry! Something happend in the details.`);
  }
}

function* detailsSaga() {
  yield takeLatest('FETCH_PROJECT_DETAILS', fetchProjectDetails);
}


export default detailsSaga;
