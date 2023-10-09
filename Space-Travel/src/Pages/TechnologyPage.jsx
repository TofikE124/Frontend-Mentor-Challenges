import React, { useState } from "react"
import { NavLink, useParams } from "react-router-dom"

import launchVehicleLandscape from '../assets/technology/image-launch-vehicle-landscape.jpg'
import launchVehiclePortrait from '../assets/technology/image-launch-vehicle-portrait.jpg'
import spaceportLandscape from '../assets/technology/image-spaceport-landscape.jpg'
import spaceportPortrait from '../assets/technology/image-spaceport-portrait.jpg'
import spaceCapsuleLandscape from '../assets/technology/image-space-capsule-landscape.jpg'
import spaceCapsulePortrait from '../assets/technology/image-space-capsule-portrait.jpg'

import data from '../data.json'

export default function crewPage(){

    const imagesLandscape  = [launchVehicleLandscape,spaceportLandscape,spaceCapsuleLandscape]
    const imagesPortrait = [launchVehiclePortrait,spaceportPortrait,spaceCapsulePortrait]



    const params = useParams()


    let craftIndex = params.craftIndex
    
    !craftIndex?craftIndex=1:null
    
    craftIndex= Number(craftIndex) - 1

    const craftData  = data.technology [craftIndex]

    return(
        <main id="main" className="technology-page"> 
        <div className="grid-container grid-container--technology flow">
        
            <h1 className="numbered-title"><span aria-hidden="true">02</span>space launch 101</h1>
        

            <div className="tab-list numbered-indicators flex">
                <NavLink to="/technology" end className="uppercase ff-serif text-white letter-spacing-2"><span className="sr-only">Launch Vehicle</span>1</NavLink>
                <NavLink to="/technology/2" className="uppercase ff-serif text-white letter-spacing-2"><span className="sr-only">Spaceport </span>2</NavLink>
                <NavLink to="/technology/3" className="uppercase ff-serif text-white letter-spacing-2"><span className="sr-only">Space Capsule</span>3</NavLink>
            </div>


            <article className="technology-info">
                <h2 className="fs-600 uppercase text-accent ff-serif fs-400">THE TERMINOLOGY…</h2>
                <p className="fs-700 uppercase text-white ff-serif fs-600">{craftData.name}</p>
                <p>{craftData.description}</p>            
            </article>

            <div className="img-container">
                <picture>
                    <source media="(min-width:44.9999em)" srcSet={imagesPortrait[craftIndex]} />
                    <source media="(max-width:45em)" srcSet={imagesLandscape[craftIndex]} />
                    <img src={imagesLandscape[craftIndex]} />
                </picture>
            </div>

        </div>
       
        
      </main>
    )
}