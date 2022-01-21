import React from 'react';
import { useHistory } from 'react-router-dom';

export function EditEmployeeButton(props) {
    let id = props.id;

    const history = useHistory();

    return(
        <button className='page-button' value={id} onClick={() => history.push('/employee/' + id)}>
            Edit
        </button>
    );
}