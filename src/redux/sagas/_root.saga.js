import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import axios from 'axios';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// ** NEW sagas

// fetching the paints table from database
function* fetchPaintsDropdown() {
  try {
    console.log(`making axios.get for /api/user/paints`)
    const paintResults = yield axios.get('/api/user/paints');
    console.log(`paintResults:`, paintResults);

    console.log(`axios.get /api/user/paints complete!`)
    const action = { type: 'SET_PAINTS_DROPDOWN', payload: paintResults.data }
    yield put(action);
    console.log(`sending reducer 'SET_PAINTS_DROPDOWN'`);


  } catch (error) {
    console.log(`error in GET paint dropdown`);
    alert(`something went wrong with the paints!`);
  }
}

// ** NEW sagas

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
  ]);
  // ** NEW sagas here
  yield takeLatest('FETCH_PAINTS_DROPDOWN', fetchPaintsDropdown);
  
}
