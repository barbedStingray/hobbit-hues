import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// fetching the paints table from database
function* updatePublicPrivate(action) {
    try {
        yield axios.put(`/api/user/publicprivate/${action.payload}`);

    } catch (error) {
      // console.log(`error in PUT project details`);
      alert(`Sorry, your publicity status was not changed!`);
    }
  }

  function* publicSaga() {
    yield takeLatest('MAKE_PUBLIC_PRIVATE', updatePublicPrivate);
  }
  
  export default publicSaga;
