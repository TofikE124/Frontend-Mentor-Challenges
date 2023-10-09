import React, { useEffect } from "react"
import {  useOutletContext } from "react-router-dom"

import iconArcade from '../assets/images/icon-arcade.svg'
import iconAdvanced from '../assets/images/icon-advanced.svg'
import iconPro from '../assets/images/icon-pro.svg'



export default function StepThree(){



    const {
        page,setPage,
        yearly,
        addOns,setAddOns
    } = useOutletContext()


    setTimeout(() => {
        document.addEventListener('keypress',(e)=>{
            if(e.key==='Enter'){
                setPage(4)
            }
        })
    }, 500)


    function nextPage(){
        setPage(4)
    }


    function prevPage(){
        setPage(prevPage=>prevPage-1)
    }


    function switchAddOn(type){
        setAddOns(prevAddOns=>({
            ...prevAddOns,
            [type]:!prevAddOns[type]
        }))
    }

    return(
        <div className="col">
            <div className="step-form-container">
                <h2 className="step-title">Pick add-ons</h2>
                <p className="step-desc">Add-ons help enhance your gaming experience.</p>
                <form className="form-add-ons-container">

                    <div className="add-ons-container">

                        <div 
                        className={`add-on-single ${addOns.OnlineService?'selected':''}`}
                        onClick={()=>switchAddOn('OnlineService')}>  
                            <input  
                            type="checkbox"
                            checked={addOns.OnlineService}
                            onChange={()=>{}}/>
                            <div className="add-on-info">
                                <p className="add-on-name">Online service</p>
                                <p className="add-on-desc">acess to multiple game</p>
                            </div>
                            <p className="add-on-price">
                                {yearly?
                                '+$10/yr'
                                :'+$1/mo'}
                            </p>
                        </div>

                        <div 
                        className={`add-on-single ${addOns.LargeStorage?'selected':''}`}
                        onClick={()=>switchAddOn('LargeStorage')}>
                            <input  
                            type="checkbox"
                            checked={addOns.LargeStorage}
                            onChange={()=>{}} />
                            <div className="add-on-info">
                                <p className="add-on-name">Large storage</p>
                                <p className="add-on-desc">Extra 1TB of cloud save</p>
                            </div>
                            <p className="add-on-price">
                                {yearly?
                                '+$20/yr'
                                :'+$2/mo'}
                            </p>
                        </div>

                        <div 
                        className={`add-on-single ${addOns.CusProfile?'selected':''}`}
                        onClick={()=>switchAddOn('CusProfile')}>
                            <input  
                            type="checkbox" 
                            checked={addOns.CusProfile}
                            onChange={()=>{}}/>
                            <div className="add-on-info">
                                <p className="add-on-name">Customizable profile</p>
                                <p className="add-on-desc">Custom theme on your profile </p>
                            </div>
                            <p className="add-on-price">
                                {yearly?
                                '+$20/yr'
                                :'+$2/mo'}
                            </p>
                        </div>

                    </div>
                    
                </form>
                <div className="nav-buttons">
                    {
                    page!==1&&
                    <button 
                    className="prev-btn" 
                    id="prev-btn"
                    onClick={prevPage}>
                        Go Back
                    </button>
                    }
      
                    {
                    page!==4&&
                    <button 
                    className="next-btn" 
                    id="next-btn "
                    onClick={nextPage}>
                        Next Step
                    </button>
                    }
                    
                </div>

            </div>
        </div>
    )
}