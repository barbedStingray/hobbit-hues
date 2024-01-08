import React from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';

import './InfoPage.css';



function InfoPage() {
  return (

      <m.div
        key={'/info'}

        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ x: '100%' }}
  
        className="container"
        id='info-page'
      >
        <h1>Hobbit Hues Info</h1>


      </m.div>
  );
}

export default InfoPage;
