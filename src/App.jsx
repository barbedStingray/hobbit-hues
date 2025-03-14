import { Route, Routes, useLocation } from 'react-router-dom';

import HobbitHues from './pages/hobbitHues/HobbitHues.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import InfoPage from './pages/InfoPage/InfoPage.jsx';
import CreateProject from './pages/CreateProject/CreateProject.jsx';
import DataManage from './pages/dataManage/DataManage.jsx';
import MinisPage from './pages/Miniatures/MinisPage.jsx';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {

  const location = useLocation();

  return (

    <div className='hobbit-hues'>
      <Nav />

      {/* <AnimatePresence mode='wait'> */}
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={ <HobbitHues /> } />
          <Route path='/create' element={ <CreateProject /> } />
          <Route path='/minis' element={ <MinisPage /> } />
          <Route path='/data' element={ <DataManage /> } />
          {/* <Route path='/us/details/:ider' element={ <ProjectDetails /> } /> */}
          {/* <Route path='/info' element={ <InfoPage /> } />
          <Route path='/about' element={<AboutPage />} />  */}
          {/* <Route path='*' element={ <fourOhFour /> } /> */}
        </Routes>
      {/* </AnimatePresence> */}
      <Footer />
    </div>
  );
}

export default App;
