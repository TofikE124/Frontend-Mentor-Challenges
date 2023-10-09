import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import products from '../assets/Data/data.json'
import { faL } from "@fortawesome/free-solid-svg-icons";
import CategorySection from "./Sections/CategorySection";
export default function Header(){


    const navRef = useRef(null)
    const [navOpen,setNavOpen] = useState(false) 

    function handleOpenClick(){
        setNavOpen(true)
        navRef.current.classList.add('nav-open')
    }

    function handleCloseClick(){
        setNavOpen(false)
        navRef.current.classList.remove('nav-open')
    }

    const location = useLocation()
    const pathname = location.pathname;
    const isHome = pathname==='/'
    const style = {backgroundColor:"#191919"}

    const [numbers,setNumbers] = useState(null)

    const [cartElement,setCartElement] = useState(null)
    const [cartShown,setCartShown] = useState(false)

    useEffect(()=>{
        if(cartShown){
            const cart = JSON.parse(localStorage.getItem('cart'))
            setNumbers(cart.map(item=>{
                return{
                    id:item.id,
                    quantity:item.quantity
                }
            }))
        }
        
        
    },[cartShown])

    function handleDeleteAll(){
        setNumbers([])
    }

    function showCart(){
         setCartShown(true)
    }


    function handleModalClick(e){
        if(e.target.classList.contains('black-overlay')){
            closeModal()
        }   
    }

    function closeModal(){
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart = cart.filter(item=>item.quantity)
        localStorage.setItem('cart',JSON.stringify(cart))
        setCartShown(false)
    }

    

    useEffect(()=>{
        if(numbers){
            localStorage.setItem('cart',JSON.stringify(numbers))
            setCartElement(()=>{
                const cart = JSON.parse(localStorage.getItem('cart'))
                let total=0
        
                const cartItemsElements = cart.map(item=>{
                    const {id,quantity} = item
                    const product = products.find(el=>el.id===id)
                    const name = product.name.substring(0,product.name.length-product.category.length)
                    let price = product.price
                    total+=price*quantity
                    price = price>999? Math.trunc(price/1000) +',' + price%1000 : price
                    price = '$' + price
        
                    function increment(){
                        setNumbers(prevNumbers=>{
                            const numberItem = prevNumbers.find(el=>el.id===id)
                            const index = prevNumbers.indexOf(numberItem)
                            const newNumbers = [...prevNumbers]
                            newNumbers[index].quantity++
                            return newNumbers
                        })
                    }
        
                    function decrement(){
                        setNumbers(prevNumbers=>{
                            const numberItem = prevNumbers.find(el=>el.id===id)
                            const index = prevNumbers.indexOf(numberItem)
                            const newNumbers = [...prevNumbers]
                            if(newNumbers[index].quantity)
                                newNumbers[index].quantity--
                            return newNumbers
                        })
                    }

                    const numberQuantity = numbers.find(el=>el.id===id).quantity
                    
        
        
                    return(
                        <div className="cart-modal__item flex" key={item.id}>
                            <img className="cart-modal__item__img br-1" src={product.image.mobile} />
                            <div className="cart-modal__item__info flex">
                                <p className="cart-modail__item_name fs-300 uppercase fw-bold">{name}</p>
                                <p className="txt-black-05 fs-200 fw-bold uppercase">{price}</p>
                            </div>
                            <div className="numbers-input numbers-input-small flex fs-100 fw-bold bg-light">
                                <button onClick={decrement} className="flex">-</button>
                                <p>{numberQuantity}</p>
                                <button onClick={increment} className="flex">+</button>
                            </div>
                            
                            
                        </div>
                    )
                })
        
                total = total>999? Math.trunc(total/1000) +',' + total%1000 : total
                total = '$' + total

                return(
                <div className="modal cart-modal grid bg-pure-white br-1 " style={numbers&&numbers.length?null:{placeItems:"center"}}>
                    {
                    numbers&&numbers.length?
                    <>
                        <div className="cart-modal__top flex">
                            <p className="cart-modal__title fs-400 uppercase fw-bold">Cart({cart.length })</p>
                            <button onClick={handleDeleteAll} className="cart-modal__remove underline txt-black-05">Remove all</button>
                        </div>
                        <div className="cart-modal__items grid">
                            {cartItemsElements}
                        </div>
                        <div>
                            <div className="cart-modal__bottom flex">
                                <p className="txt-black-05 uppercase">Total</p>
                                <p className="fs-400 fw-bold">{total}</p>
                            </div>
                            <Link onClick={closeModal} to="/checkout" className="cart-modal__checkout btn btn-default-1 fs-100 txt-white uppercase fw-bold ">Checkout</Link>
                        </div>
                    </>
                    :
                    <h1 className="fs-800 txt-accent uppercase">Cart Is Empty</h1>
                    }
                    
                </div>
                
                )
        })   
    }
    },[numbers])

    


    

    return(
        <header id="top" className="primary-header" style={isHome?style:null}>
            {navOpen&&<div onClick={handleCloseClick} className="nav-overlay black-overlay"></div>}
            <div className="container header-container flex"> 
                <Link to="/"><div className="logo"><img src="/assets/shared/desktop/logo.svg" /></div></Link>  
                <nav ref={navRef} className="nav">
                    <button onClick={handleOpenClick} className="menu-btn"><img src="/assets/shared/tablet/icon-hamburger.svg"/></button>
                    <ul className="nav-list flex" id="home-nav">
                        <NavLink to="/" className="nav-list__link fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Home
                        </NavLink>
                        <NavLink to="category/headphones" className="nav-list__link fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Headphones
                        </NavLink>
                        <NavLink to="category/speakers" className="nav-list__link fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Speakers
                        </NavLink>
                        <NavLink to="category/earphones" className="nav-list__link fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Earphones 
                        </NavLink>
                    </ul>
                    <ul className="nav-list flex">
                        <div className="header-category-section bg-pure-white">
                            <CategorySection handleCloseClick={handleCloseClick} />
                        </div>
                    </ul>
                </nav> 
                <div className="cart-btn-container">
                    <button onClick={showCart} className="cart-btn">
                        <img src="/assets/shared/desktop/icon-cart.svg" />
                    </button>
                    
                    {cartShown?
                    <>
                    <div className="black-overlay" onClick={handleModalClick}>
                    </div>
                    {cartElement}
                    </>
                    :null
                    }
                    
                </div>
                
            </div>
            
            
            
        </header>
    )
}