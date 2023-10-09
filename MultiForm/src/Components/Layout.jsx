import React, {useEffect, useState} from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"

export default function Layout(){

    const [page,setPage]  = useState(1)
    const [submitted,setSubmitted] = useState(false)

    // Info
    const [infoData,setInfoData]=useState({name:'',email:'',phone:''});
    const [validInfo,setValidInfo] = useState({name:false,email:false,phone:false})
    const [nextClicked,setNextClicked] = useState(false) 
    
    // Plan
    const [plan,setPlan] = useState('arcade')
    const [yearly,setYearly] = useState(false)

    // Add ons
    const[addOns,setAddOns]= useState({OnlineService:false,LargeStorage:false,CusProfile:false})

    const navigate = useNavigate()
    useEffect(()=>{
        if(!submitted){
            navigate(`/step-${page}`)
        }
    },[page])

    return(
        <div className="container">
            <Sidebar page={page} setPage={setPage} submitted={submitted} validInfo={validInfo} setNextClicked={setNextClicked} />
            <Outlet 
                context={
                    {page,setPage,
                    setSubmitted
                    ,infoData,setInfoData
                    ,validInfo,setValidInfo,
                    nextClicked,setNextClicked
                    ,plan,setPlan,
                    yearly,setYearly
                    ,addOns,setAddOns
                    }} />
        </div>
    )
}