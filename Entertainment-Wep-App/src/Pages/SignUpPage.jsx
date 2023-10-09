import { Link, useNavigate } from "react-router-dom"
import { useRef, useState,useEffect } from "react"

import movieIcon from '../assets/logo.svg'

import {createUser} from '../JS/firebase'

import { onAuthStateChanged,auth } from "../JS/firebase"


export default function SignUpPage(){

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const rePasswordRef = useRef(null)

    const emailContainerRef = useRef(null)
    const passwordContainerRef = useRef(null)
    const rePasswordContainerRef = useRef(null)


    const [status,setStatus] = useState('idle')
    const [sucess,setSucess] = useState(false)
    const [error,setError] = useState(null)

    // Check if user is logged in

    const navigate = useNavigate()

    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user!==null){
                navigate('/home',{state:{loggedIn:user!==null}})
            }
        })


        function handleKeyPress(e){
            if(e.key==='Enter'){
                if(emailRef.current===document.activeElement){
                    passwordRef.current.focus()
                }
                else if(passwordRef.current===document.activeElement){
                    rePasswordRef.current.focus()
                }
                else if(rePasswordRef.current===document.activeElement){
                    SignUp()
                }
            }
        }

        document.addEventListener('keypress',handleKeyPress)
        return ()=> document.removeEventListener('keypress',handleKeyPress)


    },[])

    function validateEmail(email){
        return/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }

    function addEmpty(obj){
        obj.current.classList.add('empty')
    }

    function addError(obj){
        obj.current.classList.add('error')
    }

    function resetAll(){
        emailContainerRef.current.classList.remove('empty')
        emailContainerRef.current.classList.remove('error')
        passwordContainerRef.current.classList.remove('empty')
        passwordContainerRef.current.classList.remove('error')
        rePasswordContainerRef.current.classList.remove('empty')
        rePasswordContainerRef.current.classList.remove('error')
        setError(null)
        setSucess(false)
    }

    async function SignUp(){ 

        resetAll()

        const email = emailRef.current.value
        const password = passwordRef.current.value
        const rePassword = rePasswordRef.current.value        

        if(validateEmail(email)&&password.length>7&&password===rePassword){
            setStatus('loading')
            try{
                const user = await createUser(email,password) 
            }
            catch(error){
                setError(error)
            }
            finally{
                setStatus('idle')

            }
        }
        else{
            if(!validateEmail(email)){
                if(email.length===0){
                    addEmpty(emailContainerRef)
                }
                else{
                    addError(emailContainerRef)
                }
            }

            if(!password.length){addEmpty(passwordContainerRef)}
            else if(password.length<7){
                addError(passwordContainerRef)
            }

            if(!rePassword.length){addEmpty(rePasswordContainerRef)}
            else if(password!==rePassword){
                addError(rePasswordContainerRef)
            }
        }
    }


    const [showPassword,setShowPassword] = useState(false)
    function handleShowChange(){
        setShowPassword(prevShowPassword=>!prevShowPassword)
    }


    return(
        <div className="form-page container grid">
            <img src={movieIcon} />
            <div className="container container--form bg-semi-dark-blue flow">
                <h1 className="heading-l txt-white">Sign Up</h1>
                <div className="form-fields-container">

                <div ref={emailContainerRef} className='input-field'>
                        <input ref={emailRef} type="email" placeholder='Email adress' />
                        <p className='body-s txt-red error'>Invalid email adress</p>
                        <p className='body-s txt-red empty'>Can't be empty</p>
                    </div>

                    <div ref={passwordContainerRef} className='input-field'>
                        <input 
                            ref={passwordRef} 
                            type={showPassword?'text':'password'} 
                            placeholder='Password' />
                        <p className='body-s txt-red error'>Invalid password</p>
                        <p className='body-s txt-red empty'>Can't be empty</p>
                    </div>

                    <div ref={rePasswordContainerRef} className='input-field'>
                        <input 
                            ref={rePasswordRef} 
                            type={showPassword?'text':'password'} 
                            placeholder='Repeat password' />
                        <p className='body-s txt-red error'>Password doesn't match</p>
                        <p className='body-s txt-red empty'>Can't be empty</p>
                    </div>

                    <input onChange={handleShowChange} type="checkbox" id="show-password" />
                    <label for="show-password" className="txt-white heading-s">Show password</label>
                    

                    {error?
                        <p className="txt-red txt-center">Email already in use</p>
                        :null
                    }

                    {
                        sucess?
                        <p className="txt-center txt-white">Account was sucessfully created</p>
                        :null
                    }

                </div>
                <footer className="flow form-footer">
                    <button onClick={SignUp} className="primary-btn">
                    {status==='idle'?'Create an account':'Creating account....'}
                    </button>
                    <p className="txt-white txt-center">
                    Don't have an account? <Link to="/" className="txt-red">Login</Link>
                    </p>
                </footer>

            </div>
        </div>
    )
}