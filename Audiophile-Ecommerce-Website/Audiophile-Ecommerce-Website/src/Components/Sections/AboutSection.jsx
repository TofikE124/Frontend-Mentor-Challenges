export default function AboutSection(){
    return(
        <section className="company-about-section flex container flex">
            <picture className="company-about-section__pic">
                <source srcSet="/assets/shared/desktop/image-best-gear.jpg" media="(min-width:55em)"  />
                <source srcSet="/assets/shared/tablet/image-best-gear.jpg" media="(min-width:45em)"  />
                <img className="company-about-section__img br-1" src="/assets/shared/mobile/image-best-gear.jpg" />
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
    )
}