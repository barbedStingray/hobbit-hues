
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* newProjectPaint(action) {
    try {
        console.log(`you are in the project paint saga!`);
        console.log(`your new paint post:`, action.payload);


    } catch (error) {
      console.log(`error in POST new paint`);
      alert(`something went wrong with the paint addition!`);
    }
  }

  function* projectPaintSaga() {
    yield takeLatest('POST_PROJECT_PAINT', newProjectPaint);
  }

  
  export default projectPaintSaga;
