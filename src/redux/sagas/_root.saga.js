import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import paintSaga from './paint.saga';
import createSaga from './create.saga';
import fetchProjects from './projects.saga';
import detailsSaga from './details.saga';
import projectPaintSaga from './newPaint.saga';
import deleteProjectSaga from './deleteProject.saga';
import updateProjectSaga from './updateProject.saga';
// import axios from 'axios';
import techniqueSaga from './technique.saga';
import deletePaintSaga from './deletePaint.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga
// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    paintSaga(), // fills in paint dropdowns
    createSaga(), // POST route for new projects
    fetchProjects(), // sets user project reducer
    detailsSaga(), // sets details of individual project
    techniqueSaga(), // fetches techniques from the server
    projectPaintSaga(), // POSt route for new paints
    deleteProjectSaga(), // deletes the entire project
    deletePaintSaga(), // deletes a single paint from project
    updateProjectSaga(), // updates project data
  
  ]);  
}
