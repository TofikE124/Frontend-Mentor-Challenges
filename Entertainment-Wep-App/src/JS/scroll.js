
export default function setUp(scrollSection,rightArrow,leftArrow){

    rightArrow.addEventListener('click',()=>{
        const width = document.getElementsByClassName('thumbnail--trending')[0].offsetWidth
        scrollSection.scrollLeft +=width
    })

    leftArrow.addEventListener('click',()=>{
        const width = document.getElementsByClassName('thumbnail--trending')[0].offsetWidth
        scrollSection.scrollLeft -=width
    })
}

