import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
// custom components
import { AddProgressIcon } from '../components/AddNewProject/AddNewProject';
import Loading from '../components/Loading/Loading';
import ProjectToolbar from "../components/ProjectToolbar/ProjectToolbar";
import projectThumbnail from '../img/project-thumbnail-cropped.png';
import ProgressContainer from '../components/ProgressContainer/ProgressContainer'
import AddNewProgress from "../components/AddNewProgress/AddNewProgress";
import '../App.css';


export default function ProjectsPage() {

    // values
    const { projectId } = useParams();
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const currentDate = moment().format('YYYY-MM-DD');
    const myurl = 'https://ject-pro.herokuapp.com';
    
    // state
    const [project, setProject] = useState();
    const [progress, setProgress] = useState();
    const [progressbar, setProgressbar] = useState();
    const [newprogress, setNewprogress] = useState({ description: '' , date: currentDate });
    const [toggleupdatecard, setToggleupdatecard] = useState(false);
     


    // GET PROJECT FROM BACKEND
    useEffect(() => {
        fetch(`/projects/${projectId}`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
            .then((response) => response.json())
            .then((actualData) => {
                // fill fetched DATA in state
                setProject(actualData);
                setProgress(actualData.progress);
                setProgressbar(actualData.progressbar || 5);
            })
            .catch((err) => console.log(err));
    }, [projectId]);



    // delete project
    function deleteProject(id) {
        alert('deleting project: ', project.name);
        axios.delete(`${myurl}/projects/${id}`)
            .then(res => { 
                console.log(res.data);
            })
            .catch(err => console.log(err));
            navigate("/current");  // back to home
    }

    // update project
    function editProject(id) {
        // console.log('editing project: ', id);
        navigate(`/projects/update/${id}`);
    }

    //  PROGRESS -----

    function handleNewdescription(e) {
        const { value } = e.target;
        // console.log('descrition updated: ', value)
        setNewprogress(prevInput => {
            return {
                    ...prevInput,
                    description: value
                }
        });
    }
    
    function handleNewdate(e) {
        const { value } = e.target;
        console.log('date updated: ', value)
        setNewprogress(prevInput => {
            return {
                    ...prevInput,
                    date: value
                }
        });
    }

    function handleProgressbarChange(e) {
        // update progressbar
        const progressValue = e.target.value;
        sliderRef.current.value = progressValue;
        setProgressbar(progressValue);
        // console.log(progressValue);
    }

    // CREATE progress
    function addNewProgress() {
        // update main progress obj after checking if already added or not
        let alreadyExist = false;
        for (const property in progress) {
            if (progress[property].description !== newprogress.description ) {
                alreadyExist = false;
            }
            // already exists
            else alreadyExist = true;
        }
        if (!alreadyExist && newprogress.description !== '') {
            // add new description at the end of list
            setNewprogress({ description: '', date: currentDate }); // clear fields
            setProgress(prevProgress => [...prevProgress, newprogress] ); // append
            setToggleupdatecard( !toggleupdatecard ); // close toggle
            // if (progress.length === 0) saveProgressChanges() // on adding first progress
        } else console.log('already added description..!');
    }

    // EDIT progress
    function handleEditDescription(id, value) {
        let progressCopy = [...progress];
    
        // find edited description and modify
        progressCopy[progressCopy.findIndex(item => item._id === id)].description = value;

        // update progress
        if (id && value) {
            setProgress(progressCopy);
        }
    }

    // save to db
    function saveProgressChanges() {
        alert('saving all changes');
        console.log('updated progress: ', progress);
        // update progress - post req to Backend
        axios.post(`${myurl}/projects/${projectId}/updateprogress`, { progress, progressbar })
            .then(res => { 
                console.log(res.data);
            })
            .catch(err => console.log(err));
        window.location.reload(); // refreshh page
    }

    // toggler
    function handleToggleCard() {
        setToggleupdatecard( !toggleupdatecard );
    }

    return (
        <div className="App">

            { !project ? (
                <div style={{ 'display': 'flex', 'minHeight': '50vh', 'alignItems': 'center' }}>
                    <Loading />
                </div>) :
            
            (<div className="projectpage-wrapper">

                <ProjectToolbar
                    projectname={ project.name }
                    projectstate={ project.state }
                    onDelete={ () => deleteProject(project._id) }
                    onEdit={ () => editProject(project._id) }
                    />

                <div className="project-background-container">
                    <img className="project-thumbnail" src={ projectThumbnail } alt="project-thumbnail" />
                    <h4 className="project-date">{ moment(project.date).utc().format('YYYY-MM-DD') || project.date }</h4>
                </div>


                {/* PROGRESS TREE */}

                <section className="progress-tree">

                    {
                        project.progress.length ? <ProgressContainer progress={ progress } editDescription={ (id, value) => handleEditDescription(id, value) } /> : <span>no progress added!</span>
                    }

                </section>

                {/* ADD PROGRESS */}
                <AddProgressIcon togglecard={ handleToggleCard }  />
                { toggleupdatecard && <AddNewProgress
                                        description={ newprogress.description }
                                        date={ newprogress.date }
                                        onNewdescription={ (e) => handleNewdescription(e) }
                                        onNewdate={ (e) => handleNewdate(e) }
                                        addNewProgress={ addNewProgress }
                                        /> }

                {/* SET PROGRESSBAR */}
                <div className="setprogress-wrapper">
                    <h6>set progress</h6>
                    <input ref={ sliderRef } className="input-progress" type='range' min='0' max='100' value={ progressbar } onChange={ (e) => handleProgressbarChange(e) } />
                </div>

                {/* BOTTOM BAR */}
                <div className="bottombar-btns-wrapper">
                    <button className="btn btn-success text-uppercase" onClick={ saveProgressChanges }>save</button>
                    <Link to="/">
                        <button className="btn btn-primary text-uppercase">home</button>
                    </Link>
                </div>
            </div>) }
        </div>
    );

}