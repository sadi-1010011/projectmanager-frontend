import React, { useEffect, useState } from "react";
import axios from "axios";
import plusIcon from '../../img/plus.png';
// import projectIcon from '../img/project1.png';
import './AddNewProject.css';
import { useNavigate } from "react-router-dom";

export function AddProgressIcon({ togglecard }) {
    return (
        <div className="addprogress-wrapper">
            <span className="plusicon-wrapper">
                <img src={ plusIcon } alt="add" onClick={ togglecard } />
            </span>
        </div>
    );
}

export function AddProjectCard({ editExistingProject=false, projectId='' }) {

    const navigate = useNavigate();
    const myurl = 'https://ject-pro.herokuapp.com';

    // DEFAULT PROJECT
    const [newInput, setNewInput] = useState({
        state: 'current',
        name: '',
        description: '',
        date: '',
        type: 'Project',
        progressbar: 5,
        // progress: {},
        // pic: '',
    });

    // EDIT EXISTING PROJECT
    useEffect(() => {
        // console.log(projectId)
        if (editExistingProject && projectId) {
            fetch(`/projects/${projectId}`,  {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }}
                )
                .then((response) => response.json())
                .then((projectData) => {
                    // add to newinput
                    setNewInput({
                        state: projectData.state,
                        name: projectData.name,
                        description: projectData.description,
                        date: projectData.date,
                        type: projectData.type,
                        progressbar: projectData.progressbar || 5
                        // progress: {},
                        // pic: '',
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
       
            }
        else console.log('creating new project -');
    }, [editExistingProject, projectId]);

    // UI-UX feature
    useEffect(() => {
        const currentstatevalue = newInput.state;
        let i; // console.log(currentstatevalue)
        const currentTab = document.getElementsByClassName('projectstate-btn');
        for (i=0; i<currentTab.length; i++) {
            currentTab[i].classList.remove('active-projectstate'); // remove class
            if (currentstatevalue === currentTab[i].textContent) {
                // console.log(currentTab[i]) // apply class
                currentTab[i].classList.add('active-projectstate');
            }
        }

    }, [newInput]);
    
    function handleName(event) {
        event.preventDefault();
        const { value } = event.target;
        setNewInput(prevInput => {
            return { ...prevInput, name: value }
        });
    }

    function handleState(value) {
        setNewInput(prevInput => {
            return { ...prevInput, state: value }
        });
    }

    function handleDescription(event) {
        event.preventDefault();
        const { value } = event.target;
        setNewInput(prevInput => {
            return {
                    ...prevInput,
                    description: value
                }
        });
    }

    function handleDate(event) {
        event.preventDefault();
        const { value } = event.target;
        setNewInput(prevInput => {
            return {
                    ...prevInput,
                    date: value
                }
        });
    }

    function handlePicUpload(event) {
        event.preventDefault();
        // let { files } = event.target.files;
        // let reader = new FileReader();
        // let pic;
        // reader.readAsDataURL(files[0]);
        
        // reader.onload = (e) => {
        //     // pic = e.target.result;
        //     console.warn('image selected', pic);
        // }

        // setNewInput(prevInput => {
        //     return {
        //             ...prevInput,
        //             pic: pic
        //         }
        // });
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        // if(any unfilled field return)
        // ... conditions and checking step
        
        // send request according to edit or create
        
        if (editExistingProject && projectId) {
            // UPDATE
            console.log(newInput);
            axios.post(`${myurl}/projects/update/${projectId}`, newInput)
                .then(res => console.log(res.data));
                navigate(-1); // previous page
        }
        else { // CREATE
            axios.post(`${myurl}/projects/create`, newInput)
                .then(res => console.log(res.data));
                window.location.reload(); // reload page
        }
    }

    function handleClear(event) {
        event.preventDefault();
        setNewInput({
            state: 'current',
            name: '',
            description: '',
            date: '',
            type: 'Project',
            progressbar: 5
            // progress: {},
            // pic: 'project1.png',
        });
    }


    return (
        <div className="container-fluid pt-5 pb-5">
            <div className="updateinput-card">
                <h3 className="updateinput-title">{ editExistingProject ? 'Edit Project' : 'Create Project' }</h3>
                {/* <img src={ projectIcon } className="updateinput-image" alt="projectPic" /> */}

                <form action="" className="form-group">
                    
                    <div className="project-state">
                        <span onClick={ () => handleState('complete') } className="projectstate-btn">complete</span>
                        <span onClick={ () => handleState('current') } className="projectstate-btn">current</span>
                        <span onClick={ () => handleState('coming') } className="projectstate-btn">coming</span>
                    </div>

                    { <div><input type="text" className="form-control bg-dark text-white" placeholder="project title.." onChange={ handleName } value={ newInput.name } /></div> }
                    <label htmlFor="custom-fileupload" className="custom-uploadlabel">
                        <input type="file" id="custom-fileupload" className="form-control" onChange={ handlePicUpload }/>
                    </label>
                    <textarea cols="5" rows="2" className="updateinput-description form-control" placeholder="description.." onChange={ handleDescription } value={ newInput.description }></textarea>
                    <input type="date" className="updateinput-date form-control" onChange={ handleDate } />
                    <div className="btn-container">
                        <button className="updateinput-btn btn btn-success" onClick={ handleSubmit }>save</button>
                        <button className="updateinput-btn btn btn-secondary" onClick={ handleClear }>clear</button>
                    </div>
                </form>

            </div>
		</div>
    );
}