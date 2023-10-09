import { initializeApp } from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut  } from 'firebase/auth'
import { getFirestore,doc,addDoc, collection, getDoc, where, query, getDocs, setDoc } from "firebase/firestore"

import movies from '../data.json'

const firebaseConfig = {
  apiKey: "AIzaSyDTiYri0elykNIpKw8ZQhJj1tGUjbwA0wU",
  authDomain: "entrtainment-web-app.firebaseapp.com",
  projectId: "entrtainment-web-app",
  storageBucket: "entrtainment-web-app.appspot.com",
  messagingSenderId: "826829077970",
  appId: "1:826829077970:web:e5033cdd5b68f5eaba9c0b"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


export {onAuthStateChanged,auth}

async function createUser(email,password){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,email,password)
        setTimeout(() => {
            addUserToFireStore(userCredential.user.uid,email)
        },1000)
        return userCredential
    }
    catch(error){
        throw(error)
    }
}

async function signInUser(email,password){
    try{
        const userCredential = await signInWithEmailAndPassword(auth,email,password)
        return userCredential
    }
    catch(error){
        throw(error)
    }
}

async function signOutUser(){
    const data = await signOut(auth)
    return data
}

const db = getFirestore(app) 
const usersCollection = collection(db,'users')

async function addUserToFireStore(uid,email){
    const snapshot = await setDoc(doc(usersCollection,uid),{
        uid,
        email,
        bookmarkedBooks:JSON.stringify([])
    })
}

let userBookmarks = []

const myEvent = new Event('updatebooks')
const newUserEvent = new Event('newuser')

async function getUserBookmarks(){
    const docRef = doc(db,'users',auth.currentUser.uid)
    const docSnap =await getDoc(docRef)
    userBookmarks = docSnap.data().bookmarkedBooks
    return userBookmarks
}

async function changeMovieState(MovieId,isBookMarked){
    if(!isBookMarked){
        userBookmarks = userBookmarks.filter(bookmark=>{
            return bookmark!=MovieId
        })
    }
    else{
        userBookmarks.push(MovieId)
    }

    const docRef = doc(db,'users',auth.currentUser.uid)
    const snapshot = await setDoc(docRef,{bookmarkedBooks : userBookmarks})
    document.dispatchEvent(myEvent)
}



export {createUser,signInUser,getUserBookmarks,changeMovieState,signOutUser}