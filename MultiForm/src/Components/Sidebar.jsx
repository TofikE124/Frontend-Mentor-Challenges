import React, { useContext } from "react"
import { useOutletContext } from "react-router-dom"

export default function Sidebar({page,setPage,submitted,validInfo,setNextClicked}){

   
    function goToPage(num){
        if(!submitted){
            if(num===1){setPage(1)}
            if(num>1){
                if(validInfo.name&&validInfo.email&&validInfo.phone){
                    setPage(num)
                }
                else{
                    setNextClicked(true)
                }
            }
        }
    }    

    return(
        <div className="col left">
            <div className="sidebar-container">

                <div 
                className="step-index" 
                onClick={()=>goToPage(1)}
                >
                    <p 
                    className={`step-number-circle ${page===1?'active':''}`}>
                    1</p> 
                    <div className="step-info">
                        <p>Step 1</p>
                        <p>Your info</p>
                    </div>
                </div>

                <div 
                className="step-index" 
                onClick={()=>goToPage(2)}
                >                    <p 
                    className={`step-number-circle ${page===2?'active':''}`}>
                    2</p> 
                    <div className="step-info"> 
                    <p>Step 2</p>                  
                    <p>Select plan</p>
                    </div>
                </div>
                
                <div 
                className="step-index" 
                onClick={()=>goToPage(3)}
                >                    <p 
                    className={`step-number-circle ${page===3?'active':''}`}>
                    3</p>                     
                    <div className="step-info">
                        <p>Step 3</p>
                        <p>Add-ons</p>
                    </div>
                </div>

                <div 
                className="step-index" 
                onClick={()=>goToPage(4)}
                >                        <p 
                        className={`step-number-circle ${page===4?'active':''}`}>
                        4</p> 
                        <div className="step-info">
                        <p>Step 4</p>
                        <p>Summary</p> 
                    </div>
                </div>
            </div>
        </div>
    )
}