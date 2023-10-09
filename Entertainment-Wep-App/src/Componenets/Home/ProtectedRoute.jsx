import React,{useEffect, useState} from "react"

import { Outlet,Navigate, useLocation } from "react-router-dom"

import { onAuthStateChanged,auth } from "../../JS/firebase"


export default function ProtectedRoute(){
    return(
        auth.currentUser?
        <Outlet />
        :<Navigate to='/' />
    )
}
