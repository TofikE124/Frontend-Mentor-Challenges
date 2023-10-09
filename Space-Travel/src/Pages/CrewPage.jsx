import React from "react"
import { NavLink, useParams } from "react-router-dom"

import image1 from '../assets/crew/image-douglas-hurley.png'
import image2 from '../assets/crew/image-mark-shuttleworth.png'
import image3 from '../assets/crew/image-victor-glover.png'
import image4 from '../assets/crew/image-anousheh-ansari.png'

import data from '../data.json'

export default function crewPage(){

    const images  = [image1,image2,image3,image4]

    const params = useParams()


    let crewIndex = params.crewIndex
    
    !crewIndex?crewIndex=1:null
    
    crewIndex= Number(crewIndex) - 1

    const crewData  = data.crew[crewIndex]


    return(
        <main id="main" className="crew-page">
        <div className="grid-container grid-container--crew flow">
        
            <h1 className="numbered-title"><span aria-hidden="true">02</span> Meet your crew</h1>
        

            <div className="tab-list dot-indicators flex">
                <NavLink to="/crew" end className="uppercase ff-sans-cond text-accent bg-dark letter-spacing-2"><span className="sr-only">The commander</span></NavLink>
                <NavLink to="/crew/2" className="uppercase ff-sans-cond text-accent bg-dark letter-spacing-2"><span className="sr-only">The mission specialist</span></NavLink>
                <NavLink to="/crew/3" className="uppercase ff-sans-cond text-accent bg-dark letter-spacing-2"><span className="sr-only">The pilot</span></NavLink>
                <NavLink to="/crew/4" className="uppercase ff-sans-cond text-accent bg-dark letter-spacing-2"><span className="sr-only">The crew engineer</span></NavLink>
            </div>


            <article className="crew-info">
                <h2 className="fs-600 uppercase ff-serif">{crewData.role}</h2>
                <p className="fs-700 uppercase text-white">{crewData.name}</p>
                <p>{crewData.bio}</p>            
            </article>

            <div className="img-container">
                <img src={images[crewIndex]} />
            </div>

        </div>
       
        
      </main>
    )
}