import React, { useState } from "react";
import { motion as m, wrap } from "framer-motion";
// import { wrap } from "popmotion";
import './InfoPage.css';


const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
]
const paintingTips = [
  { technique: 'Underpaint', description: 'This is the first layer of paint that is applied to the model' },
  { technique: 'Layer', description: 'A coat of paint that is applied on top of the base, or another layer, generally taking on the color of itself and the paint underneath' },
  { technique: 'Base', description: 'A coat of paint that does not allow the paints to show' },
]

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => Math.abs(offset) * velocity;





function InfoPage() {


  const [[page, direction], setPage] = useState([0, 0]);
  // images
  const imageIndex = wrap(0, images.length, page);
  // paint tips
  const tipsIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // page custom motion
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 3.0,
        staggerChildren: 3
      }
    }
  };

  // custom box movements
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };


  return (

    <m.div
      key={'createMotionInfoPage'}
      className="container"
      variants={container}
      initial="hidden"
      transition={{ duration: 0.55, ease: 'easeOut' }}
      animate="visible"
      exit={{
        opacity: 0,
        transition: { duration: 0.5 }
      }}

      id='info-page'>

      <div id='info-header'>
        <h2>Hobbit Hues Info</h2>
      </div>


      {/* <AnimatePresence initial={false} custom={direction}> */}
      <div id='overflow-trial'>

        <div className="prev" onClick={() => paginate(-1)}>
          {"‣"}
        </div>

        {/* <div
          id='text-swipes'

          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
        </div> */}




        <m.img
          id='swipe-image'
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
        <div className="next" onClick={() => paginate(1)}>
          {"‣"}
        </div>

      </div>
      {/* </AnimatePresence> */}
    </m.div>
  );
};

export default InfoPage;