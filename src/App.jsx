
// IMPORTS
// middleware
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Pages
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';
import InfoPage from './pages/InfoPage/InfoPage.jsx';
import CreateProject from './pages/CreateProject/CreateProject.jsx';
import PersonalProjects from './pages/ProjectsPage/PersonalProjects.jsx';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails.jsx';

// import CommunityDetails from '../CommunityDetails/CommunityDetails.jsx';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';

// css
import './App.css';


function App() {

  // store variables
  const dispatch = useDispatch();
  const location = useLocation();

  // const user = useSelector(store => store.user);
  // console.log('USER', user);

  const [canEdit, setCanEdit] = useState(false);


  // page reload, render dom
  // useEffect(() => {
  //   dispatch({ type: 'FETCH_USER' });
  // }, [dispatch]);

  // console logs the location pathname of the dom
  useEffect(() => {
    console.log(`location.pathname`, location.pathname);
  }, [location]);



  return (

    <div id='app-mainDiv'>

      <Nav setCanEdit={setCanEdit} />

      {/* <AnimatePresence mode='wait'> */}

        <Routes location={location} key={location.pathname}>

          <Route path='/' element={ <UserPage /> } />
          <Route path='/create' element={ <CreateProject /> } />
          <Route path='/projects' element={ <PersonalProjects /> } />
          <Route path='/us/details/:ider' element={ <ProjectDetails canEdit={canEdit} /> } />
          <Route path='/info' element={ <InfoPage /> } />
          <Route path='/about' element={<AboutPage />} /> 
          {/* <Route path='*' element={<ProtectedRoute> <??? 404 ??? /> </ProtectedRoute>} /> */}

        </Routes>

      {/* </AnimatePresence> */}
      <Footer />
    </div>
  );
}

export default App;
