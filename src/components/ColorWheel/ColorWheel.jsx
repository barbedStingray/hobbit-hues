



function ColorWheel(props) {


  return (
    <div className='side-colors'>

    <div className="shape-container">
      <div className="divTertiary primary-triad-2"><p>Triad 2</p></div>
      <div className="divSecondary primary-triad-1"><p>Triad 1</p></div>
      <div className="divPrime primary-complement"><p>Complement</p></div>
      <div className="divSecondary primary-analog-1"><p>Analog 1</p></div>
      <div className="divTertiary primary-analog-2"><p>Analog 2</p></div>
    </div>

    <div className="shape-container">
      <div className="divTertiary primary-twolight"><p>Light</p></div>
      <div className="divSecondary primary-light"><p>Light</p></div>
      <div className="divPrime primary"><p>Primary</p></div>
      <div className="divSecondary primary-dark"><p>Dark</p></div>
      <div className="divTertiary primary-twodark"><p>Dark</p></div>
    </div>

  </div>
);
}

export default ColorWheel;
