import React, { useState } from "react";
import { motion as m, wrap } from "framer-motion";
import './InfoPage.css';




function InfoPage() {

  const paintingTips = [
    { title: 'Welcome!', info: 'On this page you will find a few tips on how Hobbit Hues operates, happy painting!' },
    { title: 'Color Wheel', info: 'This page is designed to display a little bit of color theory to help you select a palette. Click "Create New Project," to save the palette on the left to your new Project.' },
    { title: 'Image Upload', info: 'The Image Upload accepts the following file types: .gif, .jpeg, .png. Keep your models toward center frame and use a landscape or square layout for best results.' },
    { title: 'Sharing Your Projects', info: 'All of your created projects will, by default, be private. If you would like to make them public, toggle the Private/Public button in the details of that project.' },
    // { title: 'Paint Lists', info: 'The named paints used in this app are from Citadel. If you are using Citadel paints, their colors will closely match the actual color of paint.' },
    { title: 'Underpaint', info: 'An initial layer of paint that contacts the material of the model. usually monochromatic, and will help define base or layer paints that are applied over it.' },
    { title: 'Base', info: 'A paint that when applied will take on the lightness variable, but not the color of the paint beneath it.' },
    { title: 'Layer', info: 'This layer of paint is usually thin and more translucent. They are affected by the colors beneath it.' },
    { title: 'Highlight', info: 'A paint used to accent the lightest parts of your model. Can also be used to give the effect of where light hits the model.' },
    { title: 'Edge Highlight', info: 'Similar to highlighting your model, but is concentrated on hard edges.' },
    { title: 'Wash (Shade)', info: 'A diluted form of paint, using water generally. When applied, it will accumulate in the lowest poitns of the model darkening the recesses.' },
    { title: 'Dry Brush', info: 'Using a brush that is dry, make sure most of the pigment is removed from the brush before applying to the model. Apply in short sweeping motions to highlight small ridges.' },
    { title: 'Glaze (Contrast)', info: 'A diluted form of paint using matte medium. When applied, will allow the pigments to accumulate in the recesses, but will still give the affected area the specific hue.' },
    { title: 'Wet Blend', info: 'Blending a single paint with another while it is wet. You can do this upon first application, or you can add water after they dry.' },
    { title: 'Feather', info: 'Blending two paints together while both are still wet.' },
    { title: 'Two Brush Blend', info: 'Applying paint with one brush, and blending the color to a smooth transition with another.' },
    { title: 'Loaded Brush Feather', info: 'A process where you load your brush with two colors, then in a zig-zag motion draw the brush down the area giving a two-color blend as you go.' },
    { title: 'Airbrush', info: 'I dont own an airbrush, so im not familiar with any techniques used. ' },
    { title: 'Technical', info: 'The use of a technical paint generally adds texture. A common example would be mixing sand in a color to allow a grain to appear.' },
    { title: 'Stipple', info: 'Dabbing gently against the model (use paint sparingly) to generate shading effects by using small dots.' },
    { title: 'Splatter', info: 'Using your finger, pull back the bristles on your brush and allow them to flick forward, essentially splattering paint randomly across your model.' },
    { title: 'Zenithal Priming', info: 'This technique uses both a dark and a light primer. When the model is completed, the areas with lighter primer will look as though they are bathed in light.' }
  ]
  

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const [[page, direction], setPage] = useState([0, 0]);
  // images
  // const imageIndex = wrap(0, images.length, page);
  // paint tips
  const tipsIndex = wrap(0, paintingTips.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // page custom motion
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // scale: 1,
      transition: {
        // delayChildren: 3.0,
        // staggerChildren: 3
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

      <div id='overflow-trial'>

        <div className="prev" onClick={() => paginate(-1)}>
          {"‣"}
        </div>

        <m.div
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
            <h4>{paintingTips[tipsIndex].title}</h4>
            <p>{paintingTips[tipsIndex].info}</p>
        </m.div>

        <div className="next" onClick={() => paginate(1)}>
          {"‣"}
        </div>

      </div>
    </m.div>
  );
};

export default InfoPage;