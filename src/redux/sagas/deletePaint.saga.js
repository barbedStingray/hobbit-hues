
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';



// fetching the paints table from database
function* deletePaint(action) {
    try {
        console.log(`in saga for /paintDelete/:id`);
        yield axios.delete(`/api/user/paintDelete/${action.payload}`);

        console.log(`past the yield for the paintDelete`);


    } catch (error) {
      console.log(`error in DELETE /paintDelete/:id`);
      alert(`your single paint was not deleted!`);
    }
  }

  function* deletePaintSaga() {
    yield takeLatest('DELETE_SINGLE_PAINT', deletePaint);
  }

  
  export default deletePaintSaga;
