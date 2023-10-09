import { Link } from "react-router-dom";

export default function CategorySection({handleCloseClick}){

    return(
        <section className="category-section container flex">
            <div className="category-thumbnail">
                <div className="category-thumbnail-container br-1 bg-light flex">
                    <img src="/assets/shared/desktop/image-category-thumbnail-headphones.png" />
                    <p className="fs-400 uppercase fw-bold">Headphones</p>
                    <Link onClick={handleCloseClick} to="/category/headphones" className="btn btn-default-3 fs-100 txt-black uppercase fw-bold ">
                        Shop
                        <span><img src="/assets/shared/desktop/icon-arrow-right.svg" /></span>
                    </Link>   
                </div>
            </div>
            <div className="category-thumbnail">
                <div className="category-thumbnail-container br-1 bg-light flex">
                    <img src="/assets/shared/desktop/image-category-thumbnail-speakers.png" />
                    <p className="fs-400 uppercase fw-bold">Speakers</p>
                    <Link onClick={handleCloseClick} to="/category/speakers" className="btn btn-default-3 fs-100 txt-black uppercase fw-bold ">
                        Shop
                        <span><img src="/assets/shared/desktop/icon-arrow-right.svg" /></span>
                    </Link>   
                </div>
            </div>
            <div className="category-thumbnail">
                <div className="category-thumbnail-container br-1 bg-light flex">
                    <img src="/assets/shared/desktop/image-category-thumbnail-earphones.png" />
                    <p className="fs-400 uppercase fw-bold">Earphones</p>
                    <Link onClick={handleCloseClick} to="/category/earphones" className="btn btn-default-3 fs-100 txt-black uppercase fw-bold ">
                        Shop
                        <span><img src="/assets/shared/desktop/icon-arrow-right.svg" /></span>
                    </Link>   
                </div>
            </div>
        </section>
    )
}