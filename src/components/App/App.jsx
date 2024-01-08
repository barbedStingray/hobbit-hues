
// IMPORTS
// middleware
import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

// components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import CreateProject from '../CreateProject/CreateProject.jsx';
import ProjectsPage from '../ProjectsPage/ProjectsPage.jsx';
import ProjectDetails from '../ProjectDetails/ProjectDetails.jsx';

// css
import './App.css';



function App() {

  // store variables
  const dispatch = useDispatch();
  let location = useLocation();

  const user = useSelector(store => store.user);


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
      <Nav />

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
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          // ** these are the new components
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/create"
          >
            <CreateProject />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/projects"
          >
            <ProjectsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/details/:id"
          >
            <ProjectDetails />
          </ProtectedRoute>

          // ** new Components above

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
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
