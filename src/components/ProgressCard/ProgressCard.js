import React, { useEffect, useRef, useState } from "react";
import ProgressBranch from "../ProgressBranch/ProgressBranch";
import editIcon from '../../img/edit.png';
import './ProgressCard.css';

export default function ProgressCard({ id, description, date, editDescription }) {

    const [editToggle, setEditToggle] = useState(false);
    const inputRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [editToggle]);

    function toggleEditProgress() {
        if (iconRef.current) iconRef.current.classList.toggle('active-edit');
        setEditToggle( !editToggle );
    }


    return (
        <>
            <ProgressBranch />
            <div className="progress-card-wrapper">
                { !editToggle && <h5>{ description }</h5> }
                { editToggle && <textarea className="edit-progress-input" ref={inputRef} onChange={ (e) => editDescription(id, e.target.value)} placeholder={ description } value={ description }></textarea> }
                <span>{ date }</span>
                <img ref={iconRef} className="progress-edit-icon" src={ editIcon } onClick={ toggleEditProgress } alt='edit'/>
            </div>
            <ProgressBranch />
        </>
    )
}