import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// fetching the paints table from database
function* fetchPaintsDropdown() {
    try {
      const paintResults = yield axios.get('/api/user/paints');
      // dispatch to paint reducer
      const action = { type: 'SET_PAINTS_DROPDOWN', payload: paintResults.data }
      yield put(action);
    } catch (error) {
      // console.log(`error in GET paint dropdown`);
      alert(`something went wrong with the paints!`);
    }
  }

  function* paintSaga() {
    yield takeLatest('FETCH_PAINTS_DROPDOWN', fetchPaintsDropdown);
  }


  export default paintSaga;
