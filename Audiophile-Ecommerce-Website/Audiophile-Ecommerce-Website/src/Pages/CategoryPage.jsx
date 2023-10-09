import { Link, useParams } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import products from '../assets/Data/data.json'
import CategorySection from "../Components/Sections/CategorySection"
import AboutSection from "../Components/Sections/AboutSection"
 
export default function Category(){

    const params = useParams()
    const {category} = params 
    const categoryProducts = products.filter(product=>product.category===category)
    const categoryProductsElements = categoryProducts.map((product,index)=>{
        return(
            <div className="category-product-template flex" key={product.id}>
                <picture className="category-product-template__img">
                    <source srcSet={product.image.desktop} media="(min-width:55em)" />
                    <source srcSet={product.image.tablet} media="(min-width:45em)" />
                    <img src={product.image. mobile} className="category-product-template__img br-1" />
                </picture>
                <div className={`category-product-template__info grid ${index%2?'last-order':''}`}>
                    {
                    product.new?
                    <p className="category-product-template__new txt-accent uppercase fs-200 letter-spacing-1 fw-light">
                        New Product
                    </p>
                    :null
                    }
                    
                    <h2 className="category-product-template__title fs-800 fw-bold letter-spacing-3 uppercase">
                        {product.name}
                    </h2>
                    <p className="category-product-template__description">
                        {product.description}
                    </p>
                    <HashLink 
                    className="category-product-template__see btn btn-default-1 fs-100 txt-white uppercase fw-bold"
                    to={`/products/${product.slug}#top`}>
                        See product
                    </HashLink>
                </div>
            </div>
        )
    })

    return(
        <div className="category-page">
            <header  className="category-header grid">
                <h1 className="uppercase txt-white fs-800 letter-spacing-3 fw-bold">
                    {category}
                </h1>
            </header>

            <section className="category-products-container container grid">
                {categoryProductsElements}
            </section>

            {<CategorySection />}
            {<AboutSection />}

        </div>
    )
}