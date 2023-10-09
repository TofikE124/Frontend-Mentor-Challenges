import React from "react"

export default function HomePage(){
    return(
        <main id="main" className="home-page">
            <div className="grid-container grid-container--home flow">
                <div>
                    <h1 className="text-accent uppercase letter-spacing-1 ff-sans-cond fs-500">
                        SO, YOU WANT TO TRAVEL TO
                        <span className="d-block fs-900 ff-serif text-white">space</span>
                    </h1>
                    <p>
                        Let’s face it; if you want to go to space,
                        you might as well genuinely go to outer 
                        space and not hover kind of on the edge of it. Well sit back, 
                        and relax because we’ll give you a truly out of this world experience!
                    </p>
                </div>
                <div>
                    <button className="large-button text-dark ff-serif letter-spacing-3">
                    Explore
                    </button>
                </div>
                
            </div>
        </main>
        )
}