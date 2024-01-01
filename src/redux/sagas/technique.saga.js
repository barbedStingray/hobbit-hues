
import axios from 'axios';
import { all, takeLatest, put } from 'redux-saga/effects';


// fetching the paints table from database
function* fetchTechniquesDropdown() {
    try {
      console.log(`fetching techniques`);
      const techniqueResults = yield axios.get('/api/user/techniques');

      console.log(`technique.data`, techniqueResults.data);

      const action = { type: 'SET_TECHNIQUES_DROPDOWN', payload: techniqueResults.data};
      yield put(action);

    } catch (error) {
      console.log(`error in GET technique dropdown`);
      alert(`something went wrong with the techniques!`);
    }
  }

  function* techniqueSaga() {
    yield takeLatest('FETCH_TECHNIQUES_DROPDOWN', fetchTechniquesDropdown);
  }

  
  export default techniqueSaga;
