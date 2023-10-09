import { useEffect, useState } from "react"
import Products from '../assets/Data/data.json'
import { Link , useNavigate} from "react-router-dom"
import { HashLink } from "react-router-hash-link"
export default function CheckoutPage(){
    

    const [data,setData] = useState({name:'',email:'',phone:'',adress:'',ZIP:'',city:'',country:'',paymentMethod:'eMoney',eMoneyNumber:'',eMoneyPIN:''})
    const [validData,setValidData] = useState({name:false,email:false,phone:false,adress:false,ZIP:false,city:false,country:false,paymentMethod:false,eMoneyNumber:false,eMoneyPIN:false})

    const [checkedout,setCheckedout] = useState(false)

    const [CartElements,setCartElements] = useState([])
    const [Summary,setSummary] = useState(null)
    const [ThanksSummary,setThanksSummary] = useState([])
    const [grandTotalText,setGrandTotalText] = useState('')

    
    // Back btn
    const navigate = useNavigate()
    function handleBackBtn(){   
        navigate(-1,{replace:true})
    }

    function clearCart(){
        localStorage.setItem('cart',JSON.stringify([]))
    }

    function handleClick(e){
        e.target.parentElement.classList.remove('error')
        e.target.parentElement.classList.remove('empty')
    }

    function handleChange(e){

        e.target.parentElement.classList.remove('error')
        e.target.parentElement.classList.remove('empty')

        let {name,value} = e.target
        if(name==='paymentMethod'){
            value = e.target.dataset.value
            setValidData(prevValidData=>({...prevValidData,paymentMethod:true}))
        }
        else{
            if(name==='email'){
               setValidData(prevValidData=>({
                ...prevValidData,
                email:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
               }))
            }
            else if(name==='phone'){
                setValidData(prevValidData=>({
                    ...prevValidData,
                    phone:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)
                   }))
            }
            else{
                setValidData(prevValidData=>({
                    ...prevValidData,
                    [name]:Boolean(value.length)
                   }))
            }
        }

        setData(prevData=>{
            return{
                ...prevData,
                [name]:value
            }
        })

    }

    function checkout(){

        let areAllValid = true
        const keys = Object.keys(validData)
        keys.forEach(key=>{
            if((key==='eMoneyNumber'||key==='eMoneyPIN') && data.paymentMethod==='cash') return
            const parent = document.querySelector(`input[name="${key}"]`).parentElement

            if(!validData[key]){
                if(data[key].length){
                    parent.classList.add('error')
                }
                else{
                    parent.classList.add('empty')
                }
                areAllValid = false
            }
            else{
                parent.classList.remove('error')
            }
            
        })

        if(!areAllValid){
            const textFields = document.querySelectorAll('.text-field')
            for(let i=0;i<textFields.length;i++){
                if(textFields[i].classList.contains('error')||textFields[i].classList.contains('empty')){
                    textFields[i].scrollIntoView()
                    return
                }
            }
        }
        else{
            setCheckedout(true)
            clearCart()
        }

    }

    function pirceText(price){
        price = price>999? Math.trunc(price/1000) +',' + price%1000 : price
        price = '$' + price
        return price
    }

    useEffect(()=>{
        const cart =JSON.parse(localStorage.getItem('cart'))

        let total=0,shipping=50,vat=0,grandTotal=0
        let totalText,shippingText,vatText,grandTotalText
    
        const CartElements = []
        cart.forEach(item=>{
    
            const {id,quantity} = item
            const product = Products.find(el=>el.id===id)
            total+=product.price * quantity
    
            const name = product.name.substring(0,product.name.length-product.category.length)
            const price = pirceText(product.price)
            CartElements.push((
                <div className="cart-element-single flex" key={item.id}>
                    <img className="cart-element-single__img br-1" src={product.image.mobile} />
                    <div className="cart-element-single__info grid">
                        <p className="cart-element-single__name fw-bold">{name}</p>
                        <p className="cart-element-single__price txt-black-05 fs-200">{price}</p>
                    </div>
                    <p className="cart-element-single__quantity fw-bold txt-black-05">x{quantity}</p>
                </div>
            ))
        })

        vat = Math.trunc(0.2*total)
        grandTotal = total + shipping + vat
    
        totalText = pirceText(total)
        shippingText = pirceText(shipping)
        vatText = pirceText(vat)
        grandTotalText = pirceText(grandTotal)
        setGrandTotalText(grandTotalText)

        setCartElements(CartElements)
        setSummary(
            <>
                <div className="summary-info flex">
                    <p className="txt-black-05 uppercase">Total</p>
                    <p className="fs-400 uppercase fw-bold txt-black">{totalText}</p>
                </div>
                <div className="summary-info flex">
                    <p className="txt-black-05 uppercase">Shipping</p>
                    <p className="fs-400 uppercase fw-bold txt-black">{shippingText}</p>
                </div>
                <div className="summary-info flex">
                    <p className="txt-black-05 uppercase">Vat (included)</p>
                    <p className="fs-400 uppercase fw-bold txt-black">{vatText}</p>
                </div>
                <div className="summary-info flex">
                    <p className="txt-black-05 uppercase">Grand Total</p>
                    <p className="fs-400 uppercase fw-bold txt-accent">{grandTotalText}</p>
                </div>
            </>
        )
    
        const firstElement = cart[0]
        const remainning = cart.length-1
        const {id,quantity} = firstElement
        const firstPorduct = Products.find(el=>el.id===id)
        const name = firstPorduct.name.substring(0,firstPorduct.name.length-firstPorduct.category.length)
        const price = pirceText(firstPorduct.price)

        const ThanksSummary = (
            <div className="thanks-modal__summary-container bg-light grid">
                <div className="thanks-modal__summary flex">
                    <img className="thanks-modal__summary-img" src={firstPorduct.image.mobile}  />
                    <div className="thanks-modal__summary-info">
                        <p className="fw-bold">{name}</p>
                        <p className="txt-black-05 fw-bold">{price}</p>
                    </div>
                    <p className="txt-black-05 fw-bold">x{quantity}</p>
                </div>
                {
                remainning?
                <p className="thanks-modal__summary-remainning fs-100 fw-bold txt-black-05">and {remainning} other item(s)</p>
                :null
                }
            </div>
        )
    
        setThanksSummary(ThanksSummary)        
    },[])
    

    return(
        <div className="checkout-page container ">

            {checkedout?
            <>
            <div className="black-overlay grid">
                <div className="thanks-modal bg-pure-white br-1 flow">
                    {data.paymentMethod==='eMoney'?
                    <img src="/assets/checkout/icon-order-confirmation.svg" />
                    :<img src="/assets/checkout/icon-cash-on-delivery.svg" />
                    }
                    <h3 className="thanks-modal__title fs-700 fw-bold uppercase">Thank you for your order</h3>
                    <p className="thanks-modal__message txt-black-05">You will receive an email confirmation shortly.</p>
                    
                    <div className="thanks-modal__smmary-grand-container grid">
                        {ThanksSummary}
                        <div className="thanks-modal__grand-total-container grid bg-pure-black">
                            <p className="thanks-modal__grand-total-title txt-white-05 uppercase">Grand Total</p>
                            <p className="thanks-modal__grand-total-value txt-white">{grandTotalText}</p>
                        </div>
                    </div>
                    
                    <HashLink to="/#top" className="thanks-modal__btn btn btn-default-1 fs-100 txt-white uppercase fw-bold">Back to Home</HashLink>
                </div>                  
            </div>
            </>
            :null
            }
           

            <button
            onClick={handleBackBtn}
            relative='path' 
            className='go-back-cta txt-black-05'>
                Go back
            </button>


            <div className="checkout-summary-container grid">
                <div className="checkout-container br-1 bg-pure-white flow">
                    <h2 className="checkout-container__title fs-700 uppercase fw-bold">Checkout</h2>
                    
                    <div className="checkout-container__billing-details">
                        <p className="checkout-container__section-title fs-100 uppercase letter-spacing-4 txt-accent">
                            Billing Details
                        </p>
                        <div className="checkout-container__fields checkout-container__billing-details-fields grid">
                            <div className="text-field text-field__name">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">Name</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.name} type="text" className="d-block br-1" name="name" placeholder="Alexei Ward" /> 
                            </div>
                            <div className="text-field text-field__email">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">Email Adress</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.email} type="text" className="d-block br-1" name="email" placeholder="alexeiward@mail.com " /> 
                            </div>
                            <div className="text-field text-field__phone">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">Phone Number</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.phone} type="text" className="d-block br-1" name="phone" placeholder="+1 202-555-0136" /> 
                            </div>
                        </div>
                    </div> 

                    <div className="checkout-container__shipping-info">
                        <p className="checkout-container__section-title fs-100 uppercase letter-spacing-4 txt-accent">
                            Shipping Info
                        </p>
                        <div className="checkout-container__fields checkout-container__shipping-info-fields grid">
                            <div className="text-field text-field__adress">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">Your Adress</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.adress} type="text" className="d-block br-1" name="adress" placeholder="1137 Williams Avenue" /> 
                            </div>
                            <div className="text-field text-field__zip">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">Zip Code</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.ZIP} type="text" className="d-block br-1" name="ZIP" placeholder="10001" /> 
                            </div>
                            <div className="text-field text-field__city">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">City</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.city} type="text" className="d-block br-1" name="city" placeholder="New York" /> 
                            </div>
                            <div className="text-field text-field__country">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">Country</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.country} type="text" className="d-block br-1" name="country" placeholder="United States" /> 
                            </div>
                        </div>
                    </div> 

                    <div className="checkout-container__payment-details">
                        <p className="checkout-container__section-title fs-100 uppercase letter-spacing-4 txt-accent">
                            Payment  Details
                        </p>
                        <div className="checkout-container__fields checkout-container__payment-details-fields grid">
                            <label className="label__payment-method fs-200 fw-bold">
                                Payment Method
                            </label>
                            <label className="radio-selection radio-selection__e-money flex fs-200 fw-bold txt-black br-1">
                                <input onChange={handleChange} onClick={handleClick} value={data.paymentMethod==='eMoney'} checked={data.paymentMethod==='eMoney'} name="paymentMethod" data-value="eMoney" type="radio" className="radio-selection__btn" />
                                <span></span>
                                e-Money
                            </label>   
                            <label className="radio-selection radio-selection__cash flex fs-200 fw-bold txt-black br-1">
                                <input onChange={handleChange} onClick={handleClick} value={data.paymentMethod==='cash'} checked={data.paymentMethod==='cash'} name="paymentMethod" data-value="cash" type="radio" className="radio-selection__btn" />
                                <span></span>
                                Cash on Delivery
                            </label>
                            {
                            data.paymentMethod==='eMoney'?
                            <>
                            <div className="text-field text-field__e-money">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">e-Money Number</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.eMoneyNumber} type="text" className="d-block br-1" name="eMoneyNumber" placeholder="238521993" /> 
                            </div>
                            <div className="text-field text-field__cash">
                                <div className="flex text-field__labels">
                                    <label className="fw-bold text-black">e-Money PIN</label>
                                    <label className="fs-100 fw-reg error-label">Wrong format</label>
                                    <label className="fs-100 fw-reg empty-label">Can't be empty</label>
                                </div>
                                <input onChange={handleChange} onClick={handleClick} value={data.eMoenyPIN} type="text" className="d-block br-1" name="eMoneyPIN" placeholder="6891" /> 
                            </div>
                            </>
                            :null
                            }
                        </div>
                    </div> 
                </div>
                <div className="summary-container flow bg-pure-white br-1">
                    <p className="fs-400 uppercase fw-bold">Summary</p>
                    <div className="summary-cart flow">
                        {CartElements}
                    </div>
                    <div className="summary-info-container grid">
                        {Summary}
                    </div>
                    <button onClick={checkout} className="summary-container__continue-btn btn btn-default-1 fs-100 txt-white uppercase fw-bold ">continue & pay</button>
                </div>
            </div>
        </div>
    )
}  