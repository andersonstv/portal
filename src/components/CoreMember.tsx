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
        .then((res) => {
            if (res.ok){
                return res.json();
            } else{
                throw new Error("Error fetching Github API")
            }
        })
        .then( (data) => {
            setImgUrl(data.avatar_url);
            setLoading(false)
        })
        .catch( (err) => {
            console.error("Error loading Member Avatar:", err);
            setImgUrl("/assets/icons/github.svg");
            setLoading(false);
            console.log("a")
        })
    }, [username]);
    

    if (loading){
        return (
            <div className = 'core-member-container' title={name}>
                <a href={`https://github.com/${username}`}>
                    <span className='tooltip'><img src='/assets/icons/github.svg'/> {name}</span>
                </a>
                <img className= 'core-member-img' src = "/assets/icons/github.svg" alt = {`Foto Perfil ${name}`}/>
            </div>)
    }

    return (
    <div className = 'core-member-container' title={name}>
        <a href={`https://github.com/${username}`}>
            <span className='tooltip'><img src='/assets/icons/github.svg'/> {name}</span>
        </a>
        <img className= 'core-member-img' src = {imgUrl} alt = {`Foto Perfil ${name}`}/>
    </div>);
}

export default CoreMember;