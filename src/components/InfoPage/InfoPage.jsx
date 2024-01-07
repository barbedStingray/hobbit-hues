import React from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <AnimatePresence
      // initial={false}
      key={'info'}
      mode='wait'
    >

      <m.div
        key={'info'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        exit={{ opacity: 0 }}
        // exit='exit'
        className="container"
      >
        <h1>Hobbit Hues Info</h1>


      </m.div>
    </AnimatePresence>
  );
}

export default InfoPage;
