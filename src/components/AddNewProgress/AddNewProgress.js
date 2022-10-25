import React, { useEffect, useRef } from "react";
import './AddNewProgress.css';

export default function AddNewProgress({ description, date, onNewdescription, onNewdate, addNewProgress }) {
 
    const inputProgressRef = useRef(null);

    // Auto Focus on Mount
    useEffect(() => {
        const box = inputProgressRef.current; // name -just a box
        if (box) {
            box.focus();
        }
    });

    return (
        <div className="newprogress-wrapper">
            <h5>Add Progress</h5>
            <input className="edit-progress-input custom-input-textarea" type="text" ref={inputProgressRef} value={ description } onChange={ (e) => onNewdescription(e) } placeholder="Enter description" />
            <input className="custom-date-input" type='date' value={ date } onChange={ (e) => onNewdate(e) } />
            <button className="btn btn-primary m-2" onClick={ addNewProgress }>ok</button>
        </div>
    );
}