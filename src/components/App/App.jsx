
// IMPORTS
// middleware
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

// Pages
import AboutPage from '../../pages/AboutPage/AboutPage.jsx';
import UserPage from '../../pages/UserPage/UserPage.jsx';
import InfoPage from '../../pages/InfoPage/InfoPage.jsx';
import LandingPage from '../../pages/LandingPage/LandingPage.jsx';
import CreateProject from '../../pages/CreateProject/CreateProject.jsx';
import PersonalProjects from '../../pages/ProjectsPage/PersonalProjects.jsx';
import CommunityProjects from '../../pages/ProjectsPage/CommunityProjects.jsx';
import ProjectDetails from '../../pages/ProjectDetails/ProjectDetails.jsx';

// import CommunityDetails from '../CommunityDetails/CommunityDetails.jsx';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// css
import './App.css';


function App() {

  // store variables
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(store => store.user);
  // console.log('USER', user);

  const [canEdit, setCanEdit] = useState(false);


  // page reload, render dom
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  // console logs the location pathname of the dom
  useEffect(() => {
    console.log(`location.pathname`, location.pathname);
  }, [location]);



  return (

    <div id='app-mainDiv'>

      <Nav setCanEdit={setCanEdit} />

      <AnimatePresence mode='wait'>

        <Routes location={location} key={location.pathname}>

          {/* Open Routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<AboutPage />} />

          {/* User Routes */}
          <Route path='/user' element={<ProtectedRoute> <UserPage /> </ProtectedRoute>} />
          <Route path='/create' element={<ProtectedRoute> <CreateProject /> </ProtectedRoute>} />
          <Route path='/projects' element={<ProtectedRoute> <PersonalProjects /> </ProtectedRoute>} />
          <Route path='/community' element={<ProtectedRoute> <CommunityProjects /> </ProtectedRoute>} />
          <Route path='/details/:id' element={<ProtectedRoute> <ProjectDetails canEdit={canEdit} /> </ProtectedRoute>} />
          <Route path='/info' element={<ProtectedRoute> <InfoPage /> </ProtectedRoute>} />
          {/* <Route path='*' element={<ProtectedRoute> <??? 404 ??? /> </ProtectedRoute>} /> */}

        </Routes>

      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
