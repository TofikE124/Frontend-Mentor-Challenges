import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import movieIcon from '../assets/logo.svg'
import {signInUser} from '../JS/firebase'
import { onAuthStateChanged,auth } from "../JS/firebase"





export default function LoginPage(){

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const emailContainerRef = useRef(null)
    const passwordContainerRef = useRef(null)




    const [status,setStatus] = useState('idle')
    const [error,setError] = useState(null)

    const navigate = useNavigate()


    
    // Check if user is logged in
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
                    Login()
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

    function removeEmpty(obj){
        obj.current.classList.remove('empty')
    }

    function removeError(obj){
        obj.current.classList.remove('error')
    }

    function resetAll(){
        removeEmpty(emailContainerRef)
        removeError(emailContainerRef)
        removeEmpty(passwordContainerRef)
        removeError(passwordContainerRef)
        setError(null)
    }

    async function Login(){   
        resetAll()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if(validateEmail(email)&&password.length>7){
            setStatus('loading')
            try{
                const usreCredentials = await signInUser(email,password)
            }
            catch(error){
                setError(error)
            }
            finally{   
                setStatus('idle')
            }
        }
        else{
            if(!email){
                addEmpty(emailContainerRef)
            }else if(!validateEmail(email)){
                addError(emailContainerRef)
            }

            if(!password){
                addEmpty(passwordContainerRef)
            }else if(password.length<7){
                addError(passwordContainerRef)
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
                <h1 className="heading-l txt-white">Login</h1>
                <div className="form-fields-container">

                    <div ref={emailContainerRef} className='input-field'>
                        <input ref={emailRef} type="email" placeholder='Email adress' />
                        <p className='body-s txt-red error'>Invalid email adress</p>
                        <p className='body-s txt-red empty'>Can't be empty</p>
                    </div>
                    <div ref={passwordContainerRef} className='input-field'>
                        <input ref={passwordRef} 
                                type={showPassword?'text':'password'} 
                                placeholder='Password' />
                        <p className='body-s txt-red error'>Invalid password</p>
                        <p className='body-s txt-red empty'>Can't be empty</p>
                    </div>
                    <input onChange={handleShowChange} type="checkbox" id="show-password" />
                    <label for="show-password" className="txt-white heading-s">Show password</label>
                    {error?
                        <p className="txt-red txt-center">invalid login credentails</p>
                        :null
                    }

                </div>
                <footer className="flow form-footer">
                    <button
                     className="primary-btn"
                     onClick={Login}>
                    {status==='idle'?
                        'Login to your account'
                        :'Logging in....'
                    }
                    </button>
                    <p className="txt-white txt-center">Don't have an account? <Link to="sign-up" className="txt-red">Sign Up</Link></p>
                </footer>

            </div>
        </div>
    )
}