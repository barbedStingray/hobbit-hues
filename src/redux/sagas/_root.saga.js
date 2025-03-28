import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import createSaga from './create.saga';
import fetchProjects from './projects.saga';
import detailsSaga from './details.saga';
import projectPaintSaga from './newPaint.saga';
import deleteProjectSaga from './deleteProject.saga';
import updateProjectSaga from './updateProject.saga';
import techniqueSaga from './technique.saga';
import deletePaintSaga from './deletePaint.saga';
import fetchCommunity from './community.saga';
import publicSaga from './public.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga
// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    createSaga(), // POST route for new projects
    fetchProjects(), // sets user project reducer
    detailsSaga(), // sets details of individual project
    techniqueSaga(), // fetches techniques from the server
    projectPaintSaga(), // POSt route for new paints
    deleteProjectSaga(), // deletes the entire project
    deletePaintSaga(), // deletes a single paint from project
    updateProjectSaga(), // updates project data
    fetchCommunity(), // fetches community projects
    publicSaga(), // allows user to switch public/private

  ]);  
}
