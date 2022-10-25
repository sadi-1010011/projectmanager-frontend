import React from "react";
import './ProjectToolbar.css';
import deleteIcon from '../../img/delete.png';
import editIcon from '../../img/edit.png';

export default function ProjectToolbar({ projectname, projectstate, onDelete, onEdit }) {
    return (
        <div className="project-toolbar-wrapper">
            <button className="toolbar-btn project-delete-btn">
                <img className="toolbar-icon" src={deleteIcon} onClick={ onDelete } alt='delete' />
            </button>
            <div>
                <h2 className="project-title">{ projectname }</h2>
                <span style={{ 'color': 'grey' }}>( { projectstate==='coming' ? 'future project' : `${ projectstate } project` } )</span>
            </div>
            <button className="toolbar-btn project-edit-btn">
                <img className="toolbar-icon" src={editIcon} alt='edit' onClick={ onEdit } />
            </button>
        </div>
    );
}