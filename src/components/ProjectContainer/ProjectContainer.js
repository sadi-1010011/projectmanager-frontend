import React, { useEffect, useState} from "react";
import moment from "moment";
import ProjectCard from '../ProjectCard/ProjectCard';
import Loading from "../Loading/Loading";
import { AddProjectCard, AddProgressIcon } from '../AddNewProject/AddNewProject';
import "./ProjectContainer.css";

function ProjectWrapper({ project }) {

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <ProjectCard
                id={ project._id }
                name={ project.name }
                description={ project.description }
                date={ project.date = moment().format('YYYY-MM-DD') }
                progressbar = { project.progressbar || 5 } // default 5%
                // pic={ project.pic }
            />
        </div>
    );
}

export default function ProjectContainer({ projects, state }) {

    // toggler
    const [toggleupdatecard, setToggleupdatecard] = useState(false);
    function handleToggleCard() { setToggleupdatecard( !toggleupdatecard ); }

    // smooth scroll to bottom
    useEffect(() => {
        if (toggleupdatecard) {
            // console.log('scrolling..');
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, [toggleupdatecard]);


    return (
<section className="products-section" id="product-page">
	<div className="container m-auto">
		<div className="row pt-5 pb-5 justify-content-center">
            {
                projects ?
                projects.map(project => <ProjectWrapper key={project._id} project={project} />) :
                <div style={{ 'display': 'flex', 'minHeight': '50vh', 'alignItems': 'center' }}>
                    {/* <h3>loading..</h3> */}
                    <Loading />
                </div>
            }
		</div>
            <AddProgressIcon togglecard={ handleToggleCard } />
            { toggleupdatecard && <AddProjectCard title="Create Project" type="project" /> }
	</div>
</section>
    );
}
