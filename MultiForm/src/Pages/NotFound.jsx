import { Link } from "react-router-dom";
import iconError from '../assets/images/icon-error.png'
export default function StepOne(){

    return(
        <div className="not-found-page">
            <div className="step-form-container">
                <div className="thank-you-container">
                    <img src={iconError} />
                    <h2 className="step-title">Sorry This Page Was Not Found!!!</h2>
                    <Link to="/step-1" >Go back to form</Link>
                </div>
            </div>                     
        </div>
    )
}