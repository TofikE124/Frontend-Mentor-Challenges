import React, { useRef } from "react"
import { Link, NavLink } from "react-router-dom"

import logoIcon from '../assets/shared/logo.svg'


export default function Header(){

    const nav  = useRef(null)

    function toggleNav(){
        nav.current.classList.toggle('open-nav')
    }

    return(
        <header className="primary-header flex"> 
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><g fill="none" fillRule="evenodd"><circle cx="24" cy="24" r="24" fill="#FFF"/><path fill="#0B0D17" d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"/></g></svg>
            </div>
            <button
             onClick={()=>toggleNav()}
             className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false">
                <span className="sr-only">Menu</span>
            </button>
            <nav ref={nav} id="primary-navigation" className="primary-navigation underline-indicators flex">
                <button
                 onClick={()=>toggleNav()}
                 className="mobile-nav-close">
                </button>
                
                <NavLink 
                className={({isActive})=>
                `uppercase text-white ff-sans-cond ${isActive?'active':''}`}
                to=".">
                    <span aria-hidden="true">00</span>Home
                </NavLink>

                <NavLink 
                className={({isActive})=>
                `uppercase text-white ff-sans-cond ${isActive?'active':''}`}
                to="destination">
                    <span aria-hidden="true">01</span>Destination
                </NavLink>

                <NavLink 
                className={({isActive})=>
                `uppercase text-white ff-sans-cond ${isActive?'active':''}`}
                to="crew">
                    <span aria-hidden="true">02</span>Crew
                </NavLink>

                <NavLink 
                className={({isActive})=>
                `uppercase text-white ff-sans-cond ${isActive?'active':''}`}
                to="technology">
                    <span aria-hidden="true">03</span>Technology
                </NavLink>

            </nav>
        </header>
    )
}