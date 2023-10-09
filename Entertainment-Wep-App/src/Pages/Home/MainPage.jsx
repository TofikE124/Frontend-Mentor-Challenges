import React, { useEffect, useRef, useState } from "react"


import ThumbnailTrending from "../../Componenets/Thumbnails/ThumbnailTrending"
import ThumbnailRegular from "../../Componenets/Thumbnails/ThumbnailRegular"


import { getTrendingShows,getRecommendedShows,getShowsBySearch} from "../../JS/dataFun"
import setUp from "../../JS/scroll"
import { useOutletContext } from "react-router-dom"

export default function HomePage(){

    const sectionRef = useRef(null)
    const rightArrowRef = useRef(null)
    const leftArrowRef = useRef(null)

    const [trendingShows,setTrendingShows] = useState([])
    const [recommendedShows,setRecommendedShows] = useState([])
    const [searchedShows,setSearchedShows] = useState([])
    const {keyWord,bookmarks} = useOutletContext()
    const [firstLoad,setFirstLoad] = useState(true)


    useEffect(()=>{
        
        // Setting up scroll
        if(sectionRef){
            setUp(sectionRef.current,
                  rightArrowRef.current,
                  leftArrowRef.current)
        }

    },[])



    useEffect(()=>{
        if(bookmarks){
            // Getting trending shows
            setTrendingShows(getTrendingShows().map(show=>{
                return <ThumbnailTrending
                    show={show}
                    key = {show.title}
                    bookmarks={bookmarks}  />
            }))
    
            // Getting recommended shows
            setRecommendedShows(getRecommendedShows(firstLoad).map(show=>{
                return <ThumbnailRegular
                        show={show}
                        key = {show.title}
                        bookmarks={bookmarks}/>
             }))
             setFirstLoad(false)
        }
    },[bookmarks])



    useEffect(()=>{
        setSearchedShows(getShowsBySearch(keyWord,'').map(show=>{
            return <ThumbnailRegular show={show} key={show.title} bookmarks={bookmarks} />
        }))
    },[keyWord])

    return(
        <div className="main-page home-outlet">
            {
            keyWord?
            null
            :<section className="trending-section flow">
                <h1  className="heading-l txt-white">
                    Trending
                </h1>
                <div className="section-container">
                    <i id="left" ref={leftArrowRef} className="scroll-arrow">←</i>
                    <div ref={sectionRef} className="scroll-section grid">                    
                        {trendingShows?
                        trendingShows
                        :null}
                    </div>
                    <i ref={rightArrowRef} id="right"  className="scroll-arrow">→</i>
                </div>
            </section>
            }
            
            {
                keyWord?
                null:
             <section className="recommended-section flow">
                <h1  className="heading-l txt-white">
                    Recommended for you
                </h1>  
                <div className="regular-section flex">
                    {recommendedShows.length!==0?
                    recommendedShows:
                    null}
                </div>
            </section>   
            }
            {
            keyWord?
            <section className="search-section flow">
                <h1  className="heading-l txt-white">
                {searchedShows.length===0?
                    `No results were found for '${keyWord}'`      
                    :`Found ${searchedShows.length} results for '${keyWord}'`
                }                
                </h1> 
                <div className="regular-section flex">
                    {searchedShows.length!==0?
                    searchedShows:
                    null}
                </div>
             </section>
             :null
            }
            
        </div>
    )
}