import React from 'react';
import './Footer.css';
import Stingray from '../../Images/DRedIcon.png';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer><img src={Stingray} alt='stingray-logo' width='40px'/> barbed_stingray</footer>;

}

export default Footer;
