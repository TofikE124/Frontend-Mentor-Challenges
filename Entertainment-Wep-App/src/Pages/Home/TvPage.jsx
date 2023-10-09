import React, { useEffect, useRef, useState } from "react"

import ThumbnailRegular from "../../Componenets/Thumbnails/ThumbnailRegular"
import { getTvShows,getShowsBySearch} from "../../JS/dataFun"

import { useOutletContext } from "react-router-dom"

export default function TvPage(){


    const [TvShows,setTvShows] = useState([])
    const [searchedTvShows,setSearchedTvShows] = useState([])

    const {keyWord,bookmarks} = useOutletContext()



    useEffect(()=>{
        // Getting Movies
        setTvShows(getTvShows().map(show=>{
            return <ThumbnailRegular
                        key = {show.title}
                        show={show}
                        bookmarks={bookmarks}  />
        }))
    },[bookmarks])


    useEffect(()=>{
        setSearchedTvShows(getShowsBySearch(keyWord,'TV Series').map(show=>{
            return <ThumbnailRegular  show={show} key={show.title} bookmarks={bookmarks} />
        }))
    },[keyWord])

    return(
        <div className="main-page home-outlet">
            
            {
                keyWord?
                null:
             <section className="movies-section flow">
                <h1  className="heading-l txt-white">
                    TV Shows
                </h1>  
                <div className="regular-section flex">
                    {TvShows.length!==0?
                    TvShows:
                    null}
                </div>
            </section>   
            }
            {
            keyWord?
            <section className="search-section flow">
                <h1  className="heading-l txt-white">
                    {searchedTvShows.length===0?
                    `No results were found for '${keyWord}'`      
                    :`Found ${searchedTvShows.length} results for '${keyWord}'`
                    }
                </h1> 
                <div className="regular-section flex">
                    {searchedTvShows.length!==0?
                    searchedTvShows:
                    null}
                </div>
             </section>
             :null
            }
            
        </div>
    )
}