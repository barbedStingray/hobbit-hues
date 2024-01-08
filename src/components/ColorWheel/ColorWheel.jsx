


function ColorWheel(props) {


  return (

    <div className='side-colors'>
      <div className="shape-container">
        <div className={`divTertiary ${props.color}-triad-2`}><p>Triad 2</p></div>
        <div className={`divSecondary ${props.color}-triad-1`}><p>Triad 1</p></div>
        <div className={`divPrime ${props.color}-complement`}><p>Complement</p></div>
        <div className={`divSecondary ${props.color}-analog-1`}><p>Analog 1</p></div>
        <div className={`divTertiary ${props.color}-analog-2`}><p>Analog 2</p></div>
      </div>
      <div className="shape-container">
        <div className={`divTertiary ${props.color}-twolight`}><p>Light</p></div>
        <div className={`divSecondary ${props.color}-light`}><p>Light</p></div>
        <div className={`divPrime ${props.color}`}><p>Primary</p></div>
        <div className={`divSecondary ${props.color}-dark`}><p>Dark</p></div>
        <div className={`divTertiary ${props.color}-twodark`}><p>Dark</p></div>
      </div>
    </div>

  );
}

export default ColorWheel;
