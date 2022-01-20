import React from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export function EditEmployee(props) {
    let { id } = useParams();   
    return(
        <div>
            <Link to="/"> Back</Link>
            <br/><br/>
            Employee {id}
        </div>
    );
}