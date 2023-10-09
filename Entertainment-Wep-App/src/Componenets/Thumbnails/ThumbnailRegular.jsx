import categoryMovie from '../../assets/icon-category-movie.svg'
import categoryTvSeries from '../../assets/icon-category-tv.svg'
import iconDot from '../../assets/icon-dot.svg'
import iconPlay from '../../assets/icon-play.svg'

import {changeMovieState} from '../../JS/firebase'

export default function ThumbnailTrending({show,bookmarks}){

    if(!bookmarks){bookmarks=[]}

    const {id,title,year,category,rating,thumbnail} = show

    const isBookmarked = bookmarks.includes(id)
    const active = isBookmarked?'active' :''


    function handleClick(){
        changeMovieState(id,!isBookmarked)
    }

    return(
        <div className='thumbnail thumbnail--regular grid text'>
            <button className={`bookmark ${active}`} onClick={handleClick}></button>
                <div className='thumbnail-img-container'>
                    <img src={thumbnail.regular.large.substring(1)} />
                    <button className='play-trailer-btn'>
                        <img src={iconPlay} />
                        <p className='txt-white heading-xs'>Play </p>
                    </button>
                </div>
                <div className='thumbnail-details-container grid'>
                    <div className='thumbnaul-details flex body-s' style={{"--gap":"0.5rem"}}>
                        <p>{year}</p>
                        <img src={iconDot} />
                        <img src={
                            category==='Movie'?
                            categoryMovie
                            :categoryTvSeries
                                }/>                        
                        <p>{category}</p>
                        <img src={iconDot} />
                        <p className='uppercase'>{rating}</p>
                    </div>
                    <p className='thumbnail-name heading-m txt-white'>{title}</p>
                </div>
            </div>
    )
}