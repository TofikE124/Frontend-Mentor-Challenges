import React, { useEffect, useState } from "react"

import{getUserBookmarks,auth} from '../../JS/firebase'

import HomeHeader from "./HomeHeader"
import { Outlet } from "react-router-dom"

export default function HomeLayout(){
    
    const [keyWord,setKeyWord] = useState('')
    const [bookmarks,setBookmarks] = useState([])

    // getting bookmarks
    async function getBookMarks(){
        const data = await getUserBookmarks()
        setBookmarks(data)
    }

    

    // document.addEventListener('newuser',()=>{
    //     setBookmarks([])
    // })

    useEffect(()=>{
        if(auth.currentUser.metadata.creationTime!==auth.currentUser.metadata.lastSignInTime){
            getBookMarks()
        }
        document.addEventListener('updatebooks',()=>{
            getBookMarks()
        })
    },[])

    return(
        <div className="home-layout container">
            <HomeHeader keyWord={keyWord} setKeyWord={setKeyWord} /> 
            <Outlet context={{keyWord,bookmarks}}/>
        </div>
    )
}