import React from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (

      <m.div
        key={'/info'}

        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ x: '100%' }}
  
        className="container"
      >
        <h1>Hobbit Hues Info</h1>


      </m.div>
  );
}

export default InfoPage;
