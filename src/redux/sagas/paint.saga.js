import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* fetchPaintsDropdown() {
    try {
      // console.log(`making axios.get for /api/user/paints`);
      const paintResults = yield axios.get('/api/user/paints');
      // console.log(`paintResults:`, paintResults);
  
      // console.log(`axios.get /api/user/paints complete!`);
      const action = { type: 'SET_PAINTS_DROPDOWN', payload: paintResults.data }
      yield put(action);
      // console.log(`sending reducer 'SET_PAINTS_DROPDOWN'`);
    } catch (error) {
      console.log(`error in GET paint dropdown`);
      alert(`something went wrong with the paints!`);
    }
  }

  function* paintSaga() {
    yield takeLatest('FETCH_PAINTS_DROPDOWN', fetchPaintsDropdown);
  }

  
  export default paintSaga;
