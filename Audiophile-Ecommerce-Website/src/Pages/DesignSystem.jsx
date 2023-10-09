import { useState } from "react"



export default function DesignSystem(){

    const [number,setNumber] = useState(1)

    function increment(){
        setNumber(prevNumber=>prevNumber+1)
    }

    function decrement(){
        setNumber(prevNumber=>{
            return prevNumber > 0 ? prevNumber-1 : prevNumber
        })
    }

    return(
        <div className="design-system pure-light container flow grid">
            <button className="btn btn-default-2 fs-100 txt-black uppercase fw-bold ">See product</button>
            <button className="btn btn-default-3 fs-100 txt-black uppercase fw-bold ">
                Shop
                <span><img src="assets/shared/desktop/icon-arrow-right.svg" /></span>
            </button>

            <div className="text-field">
                <div className="flex text-field__labels">
                    <label className="fw-bold text-black">Name</label>
                    <label className="fs-100 fw-reg ">Wrong format</label>
                </div>
                <input type="text" className="d-block br-1" placeholder="Insert your name" /> 
            </div>

            <label className="radio-selection flex fs-200 fw-bold txt-black br-1">
                    <input name="radio" type="radio" className="radio-selection__btn" />
                    <span></span>
                    e-Money
            </label>
    
            <div className="numbers-input flex fs-100 fw-bold bg-light">
                <button onClick={decrement} className="flex">-</button>
                <p>{number}</p>
                <button onClick={increment} className="flex">+</button>
            </div>

            <section className="company-about-section flex container flex">
                <picture className="company-about-section__pic">
                    <source srcSet="assets/shared/desktop/image-best-gear.jpg" media="(min-width:55em)"  />
                    <source srcSet="assets/shared/tablet/image-best-gear.jpg" media="(min-width:45em)"  />
                    <img className="company-about-section__img br-1" src="assets/shared/mobile/image-best-gear.jpg" />
                </picture>
                <div className="company-about-section__info">
                    <h2 className="company-about-section__title fs-800 fw-bold letter-spacing-3 uppercase">
                        Bringing you the <span className="txt-accent">best</span> audio gear
                    </h2>
                    <p className="company-about-section__description">
                        Located at the heart of New York City, Audiophile is the premier store for high
                        end headphones, earphones, speakers, and audio accessories. We have a large showroom and
                        luxury demonstration rooms available for you to browse and experience a wide range of our
                        products. Stop by our store to meet some of the fantastic people who make Audiophile the best
                        place to buy your portable audio equipment.
                    </p>
                </div>  
            </section>

        </div>
    )
}