import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export function DeleteEmployeeButton(props) {
    let id = props.id;

    const history = useHistory();

    const handleDelete = () => {
        axios.delete('/delete/' + id)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
              });
        sessionStorage.setItem('reload', "true");
    }

    return(
        <button className='page-button' value={id} onClick={handleDelete}>
            Delete
        </button>
    );
}

