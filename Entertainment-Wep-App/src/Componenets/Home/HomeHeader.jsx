import React, { useEffect, useState } from "react"

import logoIcon from '../../assets/logo.svg'
import signOutIcon from '../../assets/logout.png'
import avatarImage from '../../assets/image-avatar.png'
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import searchIcon from '../../assets/icon-search.svg'

import {signOutUser} from '../../JS/firebase'

export default function HomeHeader({keyWord,setKeyWord}){


    const [searchMessage,setSearchMessage] = useState('')

    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()

    useEffect(()=>{
        if(pathname==='/home'){
            setSearchMessage('Search for movies or TV series') 
        }
        else if(pathname==='/home/movies'){
            setSearchMessage('Search for movies')
        }
        else if(pathname==='/home/tv-series'){
            setSearchMessage('Search for TV series')
        }
        else if(pathname==='/home/bookmarked'){
            setSearchMessage('Search for bookmarked shows')
        }
    },[location])
    

    function handleChange(e){
        setKeyWord(e.target.value)
    }

    function handleClick(){
        setKeyWord('')
    }

    function signOut(){
        signOutUser().then(()=>navigate('/'))
    }

    return(
        <div className="home-header">

            <div className="home-sidebar container flex bg-semi-dark-blue">
                <img src={logoIcon}/>
                <nav className="flex" >

                    <NavLink id="home-icon" to='.' onClick={handleClick}  end/>

                    <NavLink id="movies-icon" to="movies" onClick={handleClick} />

                    <NavLink id="tv-series-icon" to="tv-series" onClick={handleClick} />

                    <NavLink id="bookmarked-icon" to="bookmarked" onClick={handleClick} />

                </nav>
                <div className="flip-card">

                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={avatarImage}/>
                    </div>
                    <div className="flip-card-back">
                        <button onClick={signOut} className="sign-out-btn"><img src={signOutIcon} /></button>
                    </div>
                </div>
                </div>
            </div>

            <div className="home-search-bar search-bar flex heading-s">
                <img src={searchIcon} />
                <input value={keyWord} onChange={handleChange} 
                className="txt-white" 
                placeholder={searchMessage} />
             </div>
        </div>
    )
}