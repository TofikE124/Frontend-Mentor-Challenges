import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faTwitter,faSquareFacebook,faInstagram } from "@fortawesome/free-brands-svg-icons"

export default function Footer(){
    return(
        <footer className="primary-footer bg-dark txt-white">
            <div className="footer-container container grid">
                <div className="footer__logo"><img src="/assets/shared/desktop/logo.svg" /></div>  
                <nav className="footer__nav">
                    <ul className="footer__nav-list flex">
                        <NavLink to="/" className=" fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Home
                        </NavLink>
                        <NavLink to="category/headphones" className="fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Headphones
                        </NavLink>
                        <NavLink to="category/speakers" className="fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Speakers
                        </NavLink>
                        <NavLink to="category/earphones" className="fs-100 letter-spacing-2 fw-bold uppercase txt-white">
                            Earphones 
                        </NavLink>
                    </ul>
                </nav>
                <p className="footer__description">
                    Audiophile is an all in one stop to fulfill your audio needs. 
                    We're a small team of music lovers and sound specialists who are devoted to helping you 
                    get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                </p>
                <p className="footer__copyright fw-bold">Copyright 2023. All Rights Reserved</p>
                <ul className="footer__social-links flex">
                    <a>
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faSquareFacebook} />
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </ul>
            </div>
        </footer>
    )
}