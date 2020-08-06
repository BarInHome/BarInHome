import React from 'react'
import axios from '../../../utils/axios';
import Button from '@material-ui/core/Button';

export default function APITest(): JSX.Element {

    const onClick = () =>{  
        axios.get('/auth/APITest').then(()=>console.log("ok"))
    }
    
    return(
        <Button onClick={onClick}>do request</Button>
    );
}