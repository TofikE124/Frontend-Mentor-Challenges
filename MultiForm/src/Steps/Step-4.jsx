import React, { useEffect } from "react"
import {  Link, useNavigate, useOutletContext } from "react-router-dom"

import iconArcade from '../assets/images/icon-arcade.svg'
import iconAdvanced from '../assets/images/icon-advanced.svg'
import iconPro from '../assets/images/icon-pro.svg'



export default function StepFour (){

    const navigate = useNavigate()

    const {
        page,setPage,
        setSubmitted,
        yearly,
        plan,
        addOns,
    } = useOutletContext()

    // Calculating plan cost
    let planCost = 
        plan==='arcade'?9
        :plan==='advanced'?12
        :15 
    
    planCost = 
        yearly ? planCost*10
        :planCost
    
    const planCostText = `$${planCost}/${yearly?'yr':'mo'}` 

    let addOnTotal=0

    addOns.OnlineService?
        addOnTotal+=1
        :null
    
    
    addOns.LargeStorage?
    addOnTotal+=2
    :null

    addOns.CusProfile?
    addOnTotal+=2
    :null
        
    yearly?
        addOnTotal*=10
        :''
    
    
    const sumTotal = addOnTotal + planCost

    const sumTotalText = yearly?
        `+$${sumTotal}/yr`
        :`+$${sumTotal}/mo`



    setTimeout(() => {
        document.addEventListener('keypress',(e)=>{
            if(e.key==='Enter'){
                confirm()
            }
        })
    }, 500);

    function confirm(){
        setSubmitted(true)
        navigate('/thank-you')
    }

    function prevPage(){
        setPage(prevPage=>prevPage-1)
    }

    return(
        <div className="col">
            <div className="step-form-container">
                <h2 className="step-title">Finishing up</h2>
                <p className="step-desc">Double-check everything looks OK before confirming.</p>

                    <div className="summary-container">

                        <div className="plan-sum">
                            <div className="plan-sum-info">
                                <p> 
                                    {plan+
                                    (yearly?' (Yearly)':' (Monthly)')}
                                </p>
                                <button
                                onClick={()=>setPage(2)}
                                >Change</button>
                            </div> 
                            <div className="plan-sum-price">{planCostText}</div>
                        </div>  

                        <div className="add-ons-sum-container">
                            
                        {
                            addOns.OnlineService&&
                            <div className="add-on-sum">
                                <p className="add-on-sum-name">Online Service</p>
                                <p className="add-on-sum-price">
                                    {
                                        yearly?
                                        '+$10/yr'
                                        :'+$1/mo'
                                    }
                                </p>
                            </div> 
                        }

                        {
                            addOns.LargeStorage&&
                            <div className="add-on-sum">
                                <p className="add-on-sum-name">Large storage</p>
                                <p className="add-on-sum-price">
                                    {
                                        yearly?
                                        '+$20/yr'
                                        :'+$2/mo'
                                    }
                                </p>
                            </div>
                        }

                        {
                            addOns.CusProfile&&
                            <div className="add-on-sum">
                                <p className="add-on-sum-name">Customizable profile</p>
                                <p className="add-on-sum-price">
                                    {
                                        yearly?
                                        '+$20/yr'
                                        :'+$2/mo'
                                    }
                                </p>
                            </div>
                        }

                        </div>
                </div>

                <div className="sum-total">
                            <p className="total-per">
                                Total
                                 {
                                    yearly?
                                    ' (per year)'
                                    :' (per month)'
                                 }
                            </p>
                            <p className="sum-total-price">
                                {sumTotalText}
                            </p>
                </div>


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
      
                    <button 
                    className="confirm-btn" 
                    id="next-btn "
                    onClick={confirm}>
                        Confirm
                    </button>
                    
                </div>

            </div>
        </div>
    )
}