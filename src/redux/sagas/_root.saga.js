import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// ** NEW sagas
function* fetchPaintsDropdown() {
  try {
    

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
  // new sagas here
  yield takeLatest('FETCH_PAINTS_DROPDOWN', fetchPaintsDropdown);
  
}
