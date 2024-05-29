
// IMPORTS
// middleware
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useLocation} from 'react-router-dom';
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
  let location = useLocation();

  const user = useSelector(store => store.user);

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

      {/* Wrapped switch element to allow animations/transitions */}
      <AnimatePresence
        mode='wait'
      // ! There should be another key here 
      >
        <Switch location={location} key={location.pathname}>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>




          // ** these are the new components


          <ProtectedRoute
            exact
            path="/create"
          >
            <CreateProject />
          </ProtectedRoute>


          <ProtectedRoute
            exact
            path="/projects"
          >
            <PersonalProjects />
          </ProtectedRoute>






    {/* THESE TWO SHOULD LEAD TO THE SAME PATH */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/details/:id"
          >
            <ProjectDetails canEdit={canEdit} />
          </ProtectedRoute>

          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/communityDetail/:id"
          >
            <CommunityDetails />
          </ProtectedRoute> */}

          <ProtectedRoute
            exact
            path="/community"
          >
            <CommunityProjects />
          </ProtectedRoute>

          // ** new Components above

          <ProtectedRoute
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
    // </Router>
  );
}

export default App;
