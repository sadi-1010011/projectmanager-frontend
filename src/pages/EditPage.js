import React from "react";
import { useParams } from "react-router-dom";
import { AddProjectCard } from '../components/AddNewProject/AddNewProject';

import '../App.css';

export default function EditPage() {

    const { projectId } = useParams();


    return (
        <div className="editpage-wrapper">
            <div className="text-center pb-3">
                <AddProjectCard editExistingProject={ true } projectId={ projectId } />
            </div>
        </div>
    );
}