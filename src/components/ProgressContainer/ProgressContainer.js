import React from 'react';
import moment from 'moment';
import ProgressCard from "../../components/ProgressCard/ProgressCard";
import Loading from '../Loading/Loading';
import './ProgressContainer.css';

export default function ProgressContainer({ progress, editDescription }) {

    return (
        <div className='progress-container'>
            {
                progress ?
                    progress.map((item) =>
                        <ProgressCard
                            key={item._id}
                            id={item._id}
                            description={ item.description }
                            date={ item.date  = moment().format('YYYY-MM-DD') }
                            editDescription={ (id, value) => editDescription(id, value) } />) :
                <Loading />
            }
        </div>
    );
}
