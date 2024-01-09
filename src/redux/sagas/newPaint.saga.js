
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';


// fetching the paints table from database
function* newProjectPaint(action) {
    try {
        yield axios.post('/api/user/newPaint', action.payload);

    } catch (error) {
      // console.log(`error in POST new paint`);
      alert(`something went wrong with the paint addition!`);
    }
  }

  function* projectPaintSaga() {
    yield takeLatest('POST_PROJECT_PAINT', newProjectPaint);
  }

  export default projectPaintSaga;
