import products from '../assets/Data/data.json'
import { useNavigate, useParams } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { useEffect, useState } from 'react'

import CategorySection from "../Components/Sections/CategorySection"
import AboutSection from "../Components/Sections/AboutSection"

export default function ProductDetails(){

    const params = useParams()
    const productSlug = params.product
    const product = products.find(product=>product.slug===productSlug)
    let price = product.price
    price = price>999? Math.trunc(price/1000) +',' + price%1000 : price
    price = '$' + price

    

    const inTheBoxElements = product.includes.map((item,index)=>{
        return(
            <div className='product-details-info__box-element' key={index}>
                <p className='txt-black-05'>
                    <span className='fw-bold txt-accent'>x{item.quantity}</span>
                    {item.item}
                </p>
            </div>
        )
    })

    const suggestionsElements = product.others.map((item,index)=>{
        return(
            <div className='product-details-suggestions__item flex' key={index}>
                <picture className='product-details-suggestions__pic'>
                    <source srcSet={item.image.desktop} media='(min-width:55em)' />
                    <source srcSet={item.image.tablet} media='(min-width:45em)' />
                    <img src={item.image.mobile} className='product-details-suggestions__img br-1' />
                </picture>
                <p className='fs-500 uppercase fw-bold'>{item.name}</p>
                <HashLink onClick={()=>setNumber(1)} to={`/products/${item.slug}#top`} className="btn btn-default-1 fs-100 txt-white uppercase fw-bold ">See product</HashLink>
            </div>
        )
    })

    const [number,setNumber] = useState(1)

    function increment(){
        setNumber(prevNumber=>prevNumber+1)
    }

    function decrement(){
        setNumber(prevNumber=>{
            return prevNumber > 1 ? prevNumber-1 : prevNumber
        })
    }

    // Back btn
    const navigate = useNavigate()
    function handleBackBtn(){   
        navigate(-1,{replace:true})
    }


    function addToCart(id){
        const product = products.find(el=>el.id===id)
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            let cartElement = cart.find(el=>el.id===id)
            if(cartElement){
                cartElement.quantity+=number
            }
            else{
                cartElement = {id,quantity:number}
                cart.push(cartElement)
            }
            localStorage.setItem('cart',JSON.stringify(cart))

        }
        else{
            localStorage.setItem('cart',JSON.stringify([{id,quantity:number}]))
        }
        addPopup(number)
    }

    const [popups,setPopups] = useState([])

    function addPopup(quantity){
        setPopups(prevPopups=>{
            return[...prevPopups,(
            <div className="popup bg-accent" key={prevPopups.length}>
                <p className="fs-700 txt-white">
                    {`${quantity} item has been added to your cart`}
                </p>
            </div>
            )]
        })
        setTimeout(() => {
            setPopups(prevPopups=>{
                prevPopups.shift()
                return [...prevPopups]
            })
        }, 3000);
    } 




    return(
        <div className="product-details-page container">

            {popups}
            
            <button
            onClick={handleBackBtn}
            relative='path' 
            className='go-back-cta txt-black-05'>
                Go back
            </button>

            <div className="product-details-template grid" key={product.id}>
                <picture className="product-details-template__pic">
                    <source srcSet={product.image.desktop} media="(min-width:55em)" />
                    <source srcSet={product.image.tablet} media="(min-width:45em)" />
                    <img className="product-details-template__img br-1" src={product.image. mobile}  />
                </picture>
                <div className="product-details-template__info grid">
                    {
                    product.new?
                    <p className="product-details-template__new txt-accent uppercase fs-200 letter-spacing-1 fw-light">
                        New Product
                    </p>
                    :null
                    }
                    
                    <h2 className="product-details-template__title fs-800 fw-bold letter-spacing-3 uppercase">
                        {product.name}
                    </h2>
                    <p className="product-details-template__description txt-black-05">
                        {product.description}
                    </p>
                    <p className="product-details-template__price fs-400 fw-bold"> 
                        {price}
                    </p>
                    <div className='product-details-template__buttons flex'>
                        
                        <div className="numbers-input flex fs-100 fw-bold bg-light">
                            <button onClick={decrement} className="flex">-</button>
                            <p>{number}</p>
                            <button onClick={increment} className="flex">+</button>
                        </div>

                        <button
                        className="product-details-template__see btn btn-default-1 fs-100 txt-white uppercase fw-bold"
                        onClick={()=>addToCart(product.id)}>
                            add to cart
                        </button>
                    </div>
                    
                </div>
            </div>

            <div className='product-details-info grid'>
                <div>
                    <h3 className='fs-700 fw-bold uppercase'>
                        features
                    </h3>
                    <p className='txt-black-05'>
                        {product.features}
                    </p>
                </div>

                <div className='product-details-info__box-container flex'>
                    <h3 className='fs-700 fw-bold uppercase'>
                        in the box
                    </h3>
                    <div className='product-details-info__box-elements flow'>
                        {inTheBoxElements}
                    </div>
                </div>
                    
                    
            </div>

            <div className='product-details-gallery grid'>
                <picture className='product-details-gallery__first'>
                    <source srcSet={product.gallery.first.desktop} media='(min-width:55em)' />
                    <source srcSet={product.gallery.first.tablet} media='(min-width:45em)' />
                    <img className='br-1' src={product.gallery.first.mobile} />
                </picture>

                <picture className='product-details-gallery__second'>
                    <source srcSet={product.gallery.second.desktop} media='(min-width:55em)' />
                    <source srcSet={product.gallery.second.tablet} media='(min-width:45em)' />
                    <img className='br-1' src={product.gallery.second.mobile} />
                </picture>

                <picture className='product-details-gallery__third'>
                    <source srcSet={product.gallery.third.desktop} media='(min-width:55em)' />
                    <source srcSet={product.gallery.third.tablet} media='(min-width:45em)' />
                    <img className='br-1' src={product.gallery.third.mobile} />
                </picture>
            </div>

            <div className='product-details-suggestions'>
                <h3 className='product-details-suggestions__title fs-700 fw-bold uppercase'>you may also like</h3>
                <div className='product-details-suggestions__container grid'>
                    {suggestionsElements}
                </div>
            </div>

            {<CategorySection />}
            {<AboutSection />}

        </div>
    )
}      