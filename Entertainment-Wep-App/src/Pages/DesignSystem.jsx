import searchIcon from '../assets/icon-search.svg'

import thumbnail from '../assets/thumbnails/beyond-earth/trending/large.jpg'
import categoryMovie from '../assets/icon-category-movie.svg'
import iconDot from '../assets/icon-dot.svg'
import iconPlay from '../assets/icon-play.svg'

export default function DesignSystem(){
    return(
        <div className="design-system grid bg-dark-white container bg-dark-blue">
             <div className="search-bar flex heading-s">
                <img src={searchIcon} />
                <input placeholder='Search for movies or TV series' />
             </div>
             <div className='input-field'>
                <input placeholder='Email adress' />
                <p className='body-s txt-red'>Can't be empty</p>
             </div>

            <button className='primary-button body-m'>Login to your account</button> 

            <button className='bookmark'></button>

            <div className='thumbnail thumbnail--regular grid text'>
            <button className='bookmark'></button>
                <div className='thumbnail-img-container'>
                    <img src={thumbnail} />
                    <button className='play-trailer-btn'>
                        <img src={iconPlay} />
                        <p className='txt-white heading-xs'>Play </p>
                    </button>
                </div>
                <div className='thumbnail-details-container grid'>
                    <div className='thumbnaul-details flex body-s' style={{"--gap":"0.5rem"}}>
                        <p>2019</p>
                        <img src={iconDot} />
                        <img src={categoryMovie}/>
                        <p>Movie</p>
                        <img src={iconDot} />
                        <p className='uppercase'>PG</p>
                    </div>
                    <p className='thumbnail-name heading-m txt-white'>Beyond Earth</p>
                </div>
            </div>
        </div>
    )
} 