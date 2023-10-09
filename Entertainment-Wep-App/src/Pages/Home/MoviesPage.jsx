import React, { useEffect, useRef, useState } from "react"


import ThumbnailRegular from "../../Componenets/Thumbnails/ThumbnailRegular"
import { getMovies,getShowsBySearch} from "../../JS/dataFun"

import { useOutletContext } from "react-router-dom"


export default function MoviesPage(){


    const [movies,setMovies] = useState([])
    const [searchedMovies,setSearchedMovies] = useState([])

    const {keyWord,bookmarks} = useOutletContext()


    useEffect(()=>{
        // Getting Movies
        setMovies(getMovies().map(show=>{
            return <ThumbnailRegular
                        show={show}
                        key = {show.title}
                        bookmarks={bookmarks}  />
        }))

    },[bookmarks])


    useEffect(()=>{
        setSearchedMovies(getShowsBySearch(keyWord,'Movie').map(show=>{
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
                    Movies
                </h1>  
                <div className="regular-section flex">
                    {movies.length!==0?
                    movies:
                    null}
                </div>
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