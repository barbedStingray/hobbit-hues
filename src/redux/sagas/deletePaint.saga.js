
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';



// fetching the paints table from database
function* deletePaint(action) {
  try {
    // DELETE
    yield axios.delete(`/api/user/paintDelete/${action.payload}`);

  } catch (error) {
    // console.log(`error in DELETE /paintDelete/:id`);
    alert(`Sorry, your single paint was not deleted!`);
  }
}

function* deletePaintSaga() {
  yield takeLatest('DELETE_SINGLE_PAINT', deletePaint);
}


export default deletePaintSaga;
