import React, { useEffect, useRef, useState } from "react"
import {  useOutletContext } from "react-router-dom"
import { validateName,validateEmail,validatePhone } from "../utils"

export default function StepOne(){


    const {
        page,setPage,
        infoData,setInfoData,
        nextClicked,setNextClicked,
        validInfo,setValidInfo
    } = useOutletContext()



    const style ={border:'1px solid var(--Red)'}

    useEffect(()=>{

        const enterClicked =(e)=>{

            const activeElement = document.activeElement
    
            const inputName = document.getElementById('name')
            const inputEmail = document.getElementById('email')
            const inputPhone = document.getElementById('phone')

            if(e.key==='Enter'){
                if(activeElement.id===inputName.id){
                    inputEmail.focus()
                }
                else if(activeElement.id===inputEmail.id){
                    inputPhone.focus()
                }
                else if(activeElement.id===inputPhone.id){
                    nextPage()
                }
            }
    
        }

        document.addEventListener('keypress',enterClicked)
        return ()=>document.removeEventListener('keypress',enterClicked)
        
    },[validInfo])




    function nextPage(){
        if(validInfo.name&&validInfo.email&&validInfo.phone){
            setPage(2)
        }
        else{
            setNextClicked(true)
        }
    }


    function prevPage(){
        setPage(prevPage=>prevPage-1)
    }

    function handleChange(e){
        const {name,value}=e.target
        setInfoData(prevInfoData=>{
            return{
                ...prevInfoData,
                [name]:value
            }
        })
        
    }

    useEffect(()=>{
        setValidInfo(prevValidInfo=>{
            return{
                name: validateName(infoData.name),
                email: validateEmail(infoData.email),
                phone: validatePhone(infoData.phone)        
            }
        })

    },[infoData])

    useEffect(()=>{
        console.log(validInfo)
    },[validInfo])

    return(
        <div className="col">
            <div className="step-form-container">
                <h2 className="step-title">Personal info</h2>
                <p className="step-desc">Please provide your name, email address, and phone number.</p>
                <form id="info-form">
                      <div className="form-input-container ">
                        <div className="input-info">
                            <label htmlFor="name">Name</label>
                            <label
                                style=
                                {!validInfo.name&&nextClicked?
                                    {display:'inline-block'}
                                    :null
                                } 
                                className="label-error" >
                                This field is required
                            </label>
                        </div>
                        <input 
                            style={!validInfo.name&&nextClicked?style:null}
                            id="name" 
                            name="name"
                            type="text"
                            placeholder="e.g. Stephen King" 
                            value={infoData.name}
                            onChange={handleChange}
                            required
                        /> 
                      </div>

                      <div className="form-input-container">
                        <div className="input-info">
                            <label htmlFor="email">Email</label>
                            <label 
                                style=
                                {!validInfo.email&&nextClicked?
                                    {display:'inline-block'}
                                    :null
                                }
                                className="label-error" 
                            >
                                This field is required
                            </label>
                        </div>
                        <input 
                            style={!validInfo.email&&nextClicked?style:null}
                            id="email" 
                            name="email"
                            type="email" 
                            placeholder="e.g. stephenking@lorem.com" 
                            value={infoData.email}
                            onChange={handleChange}
                            required
                            /> 
                      </div>

                      <div className="form-input-container">
                        <div className="input-info">
                            <label htmlFor="phone">Phone</label>
                            <label
                                style=
                                {!validInfo.phone&&nextClicked?
                                    {display:'inline-block'}
                                    :null
                                } 
                                className="label-error" >
                                This field is required
                            </label>
                        </div>                        
                        <input 
                            style={!validInfo.phone&&nextClicked?style:null}
                            id="phone" 
                            name="phone"
                            type="number" 
                            placeholder="e.g. +1 234 567 890" 
                            value={infoData.phone}
                            onChange={handleChange}
                            required
                            /> 
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