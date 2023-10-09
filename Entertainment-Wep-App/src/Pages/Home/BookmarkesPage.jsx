import React, { useEffect, useRef, useState } from "react"


import ThumbnailRegular from "../../Componenets/Thumbnails/ThumbnailRegular"
import { getBookmarked,getBookmarkedBySearch} from "../../JS/dataFun"

import { useOutletContext } from "react-router-dom"


export default function BookmarkesPage(){

    const [bookmarkedMovies,setbookmarkedMovies] = useState([])
    const [bookmarkedTvSeries,setBookmarkedTvSeries] = useState([])
    const [searchedMovies,setSearchedMovies] = useState([])

    const {keyWord,bookmarks} = useOutletContext()

    useEffect(()=>{


        // Getting Bookmarked Movies
        setbookmarkedMovies(getBookmarked('Movie',bookmarks).map(show=>{
            return <ThumbnailRegular
                        show={show}
                        key = {show.title}
                        bookmarks={bookmarks}  />
        }))
        // Getting Bookmarked TV Series
        setBookmarkedTvSeries(getBookmarked('TV Series',bookmarks).map(show=>{
            return <ThumbnailRegular
                        show={show}
                        key = {show.title}
                        bookmarks={bookmarks}  />
        }))

    },[bookmarks])


    useEffect(()=>{
        setSearchedMovies(getBookmarkedBySearch(keyWord,bookmarks).map(show=>{
            return <ThumbnailRegular show={show} key={show.title} bookmarks={bookmarks} />
        }))
    },[keyWord])

    return(
        <div className="main-page home-outlet">
            
            {
                keyWord?
                null:
             <section className="movies-section flow">
                <h1  className="heading-l txt-white">
                    Bookmarked Movies
                </h1> 
                {
                    bookmarkedMovies.length>0?
                    <div className="regular-section flex">
                        {bookmarkedMovies.length!==0?
                        bookmarkedMovies:
                        null}
                    </div>
                    :<h1  className="heading-l txt-red">
                        No bookmarked movies yet
                    </h1>
                } 
                
            </section>   
            }
            {
                keyWord?
                null:
                <section className="movies-section flow">
                    <h1  className="heading-l txt-white">
                        Bookmarked TV Series
                    </h1> 
                    {
                        bookmarkedTvSeries.length>0?
                        <div className="regular-section flex">
                            {bookmarkedTvSeries.length!==0?
                            bookmarkedTvSeries:
                            null}
                        </div>
                        :<h1  className="heading-l txt-red">
                            No bookmarked TV series yet
                        </h1>
                        
                    } 
                    
                </section>   
            }
            {
            keyWord?
            <section className="search-section flow">
                <h1  className="heading-l txt-white">
                    {searchedMovies.length===0?
                    `No results were found for '${keyWord}'`      
                    :`Found ${searchedMovies.length} results for '${keyWord}'`
                    }
                </h1> 
                <div className="regular-section flex">
                    {searchedMovies.length!==0?
                    searchedMovies:
                    null}
                </div>
             </section>
             :null
            }
            
        </div>
    )
}