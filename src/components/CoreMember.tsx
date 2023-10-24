'use client'

import React, { useEffect, useState } from 'react';
import './CoreMember.css'
interface MemberProps{
    name: string;
    github: string;

}

function CoreMember (props : MemberProps){
    const [imgUrl, setImgUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const username = props.github;
    const name = props.name;
    
    // TO DO: add auth to github
    useEffect( () => {
        const url = `https://api.github.com/users/${username}`

        fetch(url)
        .then(res => res.json())
        .then( (data) => {
            setImgUrl(data.avatar_url);
            setLoading(false)
        })
        .catch( (err) => {
            console.error("Error fetching Github API:", err)
            setLoading(false);
        })
    }, [username]);
    
    // TO DO: show tooltip on hover

    if (loading){
        return (
            <div className = 'core-member-container' title={name}>
                
                <img src = {imgUrl} alt = {`Foto Perfil ${name}`}/>
            </div>)
    }

    return (
    <div className = 'core-member-container' title={name}>
        <a href={`https://github.com/${username}`}>
            <img src = {imgUrl} alt = {`Foto Perfil ${name}`}/>
        </a>
    </div>);
}

export default CoreMember;