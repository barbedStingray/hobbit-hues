import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm.jsx';

function LandingPage() {

  // toggle for login display
  const [login, setLogin] = useState(true);

  const history = useHistory();

  const loginOrRegister = (event) => {
    // history.push('/login');
    console.log(`setting login or register`);
    setLogin(!login);
    console.log(`login:`, login);
  };

  return (
    <div id='landing-page' className="container">
      {/* <h2>{heading}</h2> */}

      <div id='title-full'>
        <div id='title-hobbit'><h2>Hobbit Hues</h2></div>
        {/* <div id='title-hues'><h2>Hues</h2></div> */}
      </div>


      <div className="grid">


        <div className="grid-col grid-col_4">
          <div className={login ? 'visible' : 'invisible'}>
            <LoginForm />
          </div>
          <div className={login ? 'invisible' : 'visible'}>
            <RegisterForm />
          </div>

          <center>

          <div className={ login ? 'visible' : 'invisible'}>
              <h4>Don't have an Account?</h4>
              <button className="btn btn_sizeSm" onClick={loginOrRegister}>
                Register
              </button>
            </div>

            <div className={ login ? 'invisible' : 'visible'}>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={loginOrRegister}>
                Login
              </button>
            </div>

          </center>

        </div>



      </div>
    </div>
  );
}

export default LandingPage;





{/* <div className="grid-col grid-col_8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </p>

          <p>
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </p>

          <p>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </p>
        </div> */}

