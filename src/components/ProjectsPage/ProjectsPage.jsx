
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectItem from '../ProjectItem/ProjectItem.jsx';
// project item import

import './ProjectsPage.css';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProjectsPage(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const userProjects = useSelector((store) => store.userProjects);
    const dispatch = useDispatch();

    const [heading, setHeading] = useState('Projects');

    // load projects upon page refresh
    function setProjectList() {
        console.log(`setting projects`);
        // todo dispatch action
        dispatch({ type: 'FETCH_PROJECTS' });
    }
    useEffect(() => {
        setProjectList();
        // fadeInPage();
    }, []);


    // // !! fade animation pages
    // function fadeInPage() {
    //     if (!window.AnimationEvent) {
    //         return;
    //     }
    //     let fader = document.getElementById('fader');
    //     fader.classList.add('fade-out');
    // }

    // document.addEventListener('DOMContentLoaded', function(){
    //     if(!window.AnimationEvent) {
    //         return;
    //     }
    //     let anchors = document.getElementsByTagName('a');
    //     for (let idx = 0; idx < anchors.length; idx += 1) {
    //         if(anchors[idx].hostname !== window.location.hostname ||
    //             anchors[idx].pathname === window.location.pathname) {
    //                 continue;
    //             }
    //             anchors[idx].addEventListener('click', function(event) {
    //                 var fader = document.getElementById('fader'),
    //                     anchor = event.currentTarget;
                    
    //                 var listener = function() {
    //                     window.location = anchor.href;
    //                     fader.removeEventListener('animationend', listener);
    //                 };
    //                 fader.addEventListener('animationend', listener);
                    
    //                 event.preventDefault();

    //                 fader.classList.add('fade-in');
    //             });
    //         }
    //     });

    //     window.addEventListener('pageshow', function (event) {
    //         if (!event.persisted) {
    //           return;
    //         }
    //         var fader = document.getElementById('fader');
    //         fader.classList.remove('fade-in');
    //       });


    return (
        <div id='projects-page'>





{/* !! FADER TEXT */}
            {/* <div id='fader' className='fade-out'></div> */}







            <div id='project-heading'>
                <h2>{heading}</h2>
            </div>

            <div id='projects-display'>
                {
                    userProjects.map((project) => 
                    (<ProjectItem
                        key={project.id}
                        project={project}
                    />))
                }
            </div>

            {/* <div>
                {JSON.stringify(userProjects)}
            </div> */}
        </div>
    );
}

export default ProjectsPage;
