


function ButtonB(props) {




    return (
        <button
        onClick={props.clickFunction(props.functionArg)}
        className={props.classname}


    >{props.buttonName}</button>
);
  }
  
  export default ButtonB;
  