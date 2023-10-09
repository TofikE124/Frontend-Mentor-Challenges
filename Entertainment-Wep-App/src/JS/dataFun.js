import shows from '../data.json'


function getTrendingShows(){
    return(
        [...shows].filter(shows=>{
            return shows.isTrending
        })
    )
}

let shuffleArray = [...shows].filter(shows=>!shows.isTrending)

function getRecommendedShows(isShuffle){
    const notTrendingShows = [...shows].filter(shows=>!shows.isTrending)
    if(isShuffle){
        shuffleArray = shuffle(notTrendingShows)
    }
    return shuffleArray
    
}

// Used to shuffle(randomize) an array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


function getMovies(){
    return [...shows].filter(show=>show.category==='Movie')
}


function getTvShows(){
    return [...shows].filter(show=>show.category==='TV Series')
}


function getShowsBySearch(keyWord,category){
    if(!category){
        return [...shows].filter(show=>show.title.toLowerCase().includes(keyWord.toLowerCase()))
    }
    else{
        return [...shows].filter(show=>{
            return show.title.toLowerCase().includes(keyWord.toLowerCase()) && show.category===category
        })
    }
}


function getBookmarkedBySearch(keyWord,bookmarks){

    
    return [...shows].filter(show=>{
        return show.title.toLowerCase().includes(keyWord.toLowerCase()) && bookmarks.includes(show.id)
    })
    
}



function getBookmarked(category,bookmarks){
    return [...shows].filter(show=>bookmarks.includes(show.id)&&show.category===category)
}



export {getTrendingShows,getRecommendedShows,getShowsBySearch,getMovies,getTvShows,getBookmarked,getBookmarkedBySearch}