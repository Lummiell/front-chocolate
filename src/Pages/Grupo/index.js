import React from 'react'
import {useParams} from 'react-router-dom'
export default function Grupos(){
    let {id} = useParams();
    return <div>{id} </div>
}