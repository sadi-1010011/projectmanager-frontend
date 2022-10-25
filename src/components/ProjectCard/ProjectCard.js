import React, { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import projectThumbnail from '../../img/project-thumbnail-cropped.png';
import './ProjectCard.css';

function ProjectCard({ id, name, description, date, progressbar }) {
    
    const progressref = useRef(null);
    const progress = Number(progressbar);

    useEffect(() => {
        // PROGRESS IN %
        progressref.current.style.width = '0%';
        progressref.current.style.width = `${progress}%`;
    }, [progressbar, progress]);

    function showProgressPercent() {
        // soon..
        // progressref.current.textContent = progress;
    }

    function hideProgressPercent() {
        // soon..
        // progressref.current.textContent = '';
    }

    // require(`../img/${pic}`) for dynamic fetching img

    return (
        <div className="product-card text-center">
            <img src={ projectThumbnail } className="product-image" alt="projectPic" />
            <div className="progress-bar" onMouseEnter={ showProgressPercent } onMouseLeave={ hideProgressPercent }>
                <div ref={ progressref } className="progress-percent"></div>
            </div>
            <h3 className="product-title">{ name }</h3>
            <p className="product-description">{ description }</p>
            <span className="product-price">{ date }</span>
            <Link to={`/projects/${ id }`}>
                <button className="buy-btn">
                    view
                </button>
            </Link>
		</div>
    );
}

export default ProjectCard;