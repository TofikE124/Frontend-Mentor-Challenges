import React, { useEffect, useRef, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import data from '../data.json'


import moon from '../assets/destination/image-moon.png'
import mars from '../assets/destination/image-mars.png'
import europa from '../assets/destination/image-europa.png'
import titan from '../assets/destination/image-titan.png'


export default function DestinationPage(){


    const params = useParams()
    let planetName = params.planet

    !planetName?planetName='moon':null


    const planetData = data.destinations.find((el)=>el.name.toLowerCase()===planetName)
    const images = {moon,mars,europa,titan}


    let tabFocus = 0;

    const tabList = useRef(null)
    


    return(
    <main id="main" className="destination-page">
        <div className="grid-container grid-container--destination flow">
        
            <h1 className="numbered-title"><span aria-hidden="true">01</span> Pick your destination</h1>
        

            <div ref={tabList} role="tablist" className="tab-list underline-indicators flex">
                <NavLink role="tab" to="/destination" end className="uppercase ff-sans-cond text-accent letter-spacing-2">Moon</NavLink>
                <NavLink role="tab" to="/destination/mars" className="uppercase ff-sans-cond text-accent letter-spacing-2">Mars</NavLink>
                <NavLink role="tab" to="/destination/europa" className="uppercase ff-sans-cond text-accent letter-spacing-2">Europa</NavLink>
                <NavLink role="tab" to="/destination/titan" className="uppercase ff-sans-cond text-accent letter-spacing-2">Titan</NavLink>
            </div>

            <img src={images[planetName.toLowerCase()]} />

            <article className="destination-info">
                <h2 className="fs-800 uppercase ff-serif">{planetData.name}</h2>
            
                <p>{planetData.description}</p>
                
                <div className="destination-meta flex">
                    <div>
                    <h3 className="text-accent fs-200 uppercase">Avg. distance</h3>
                    <p className="fs-500 ff-serif uppercase">{planetData.distance}</p>
                    </div>
                    <div>
                    <h3 className="text-accent fs-200 uppercase">Est. travel time</h3>
                    <p className="fs-500 ff-serif uppercase">{planetData.travel}</p>
                    </div>
                </div>
            
            </article>
        </div>
       
        
      </main>
    )
}