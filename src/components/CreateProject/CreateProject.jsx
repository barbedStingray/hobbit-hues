
import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function CreateProject(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Create your Project!');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default CreateProject;
