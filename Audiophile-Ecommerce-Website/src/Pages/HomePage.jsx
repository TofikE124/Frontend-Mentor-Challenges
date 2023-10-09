import { HashLink as Link } from "react-router-hash-link";
import CategorySection from "../Components/Sections/CategorySection"
import AboutSection from "../Components/Sections/AboutSection"

export default function HomePage(){
    return(
        <div className="home-page">
            <section className="home-top">
                    <div className= "new-product container">
                        <div className="new-product__info flex">
                                <p 
                                className="new-product__subtitle uppercase fs-200 fw-light letter-spacing-1">
                                new product
                                </p>
                                <p 
                                className="new-product__title fs-900 fw-bold letter-spacing-2 uppercase txt-white">
                                XX99 Mark II Headphones
                                </p>
                                <p className="new-product__description">
                                Experience natural, lifelike audio and exceptional build 
                                quality made for the passionate music enthusiast.
                                </p>
                                <Link 
                                className="btn btn-default-1 fs-100 txt-white uppercase fw-bold "
                                to="/products/xx99-mark-two-headphones#top">
                                    See product
                                </Link>
                        </div>
                    </div>
            </section>

            {<CategorySection />}

            <section className="featured-products-section container">
                <div className="main-featured-product br-1 flex bg-accent">
                    <picture className="main-featured-product__pic">
                        <source srcSet="assets/home/desktop/image-speaker-zx9.png" media="(min-width: 55em)" />
                        <source srcSet="assets/home/tablet/image-speaker-zx9.png" media="(min-width: 45em)" />
                        <img src="assets/home/mobile/image-speaker-zx9.png" />
                    </picture>
                    <div className="main-featured-product__info grid txt-white">
                        <h2 className="fs-900 uppercase fw-bold letter-spacing-2">
                            ZX9 SPEAKER
                        </h2>
                        <p>
                            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                        </p>
                        <Link
                        className="btn btn-default-4 fs-100 txt-white uppercase fw-bold"
                        to="/products/zx9-speaker#top">
                            See product
                        </Link>
                    </div>
                </div>
                <div className="featured-product-2 grid br-1">
                    <h2 className="fs-600 uppercase fw-bold letter-spacing-2">
                        zx7 speaker
                    </h2>
                    <Link 
                    className="btn btn-default-2 txt-black fs-100 txt-white uppercase fw-bold"
                    to="/products/zx7-speaker#top">
                        See product
                    </Link>
                </div>
                 
                 <div className="featured-product-3 flex">
                    <picture>
                        <source srcSet="assets/home/desktop/image-earphones-yx1.jpg" media="(min-width:55em)" />
                        <source srcSet="assets/home/tablet/image-earphones-yx1.jpg" media="(min-width:45em)" />
                        <img className="featured-product-3__img br-1" src="assets/home/mobile/image-earphones-yx1.jpg" />
                    </picture>
                    <div className="featured-product-3__info bg-light grid br-1">
                        <h2 className="fs-600 uppercase fw-bold letter-spacing-2">
                            yx1 earphones
                        </h2>
                        <Link 
                        className="btn btn-default-2 txt-black fs-100 txt-white uppercase fw-bold"
                        to="/products/yx1-earphones#top">
                            See product
                        </Link>
                    </div>
                 </div>
            </section>

            {<AboutSection />}
            
        </div>
    )
}