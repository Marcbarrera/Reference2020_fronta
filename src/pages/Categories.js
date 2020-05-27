import React from 'react'
import {Link} from 'react-router-dom'

 function Categories() {
    return (
        <section className="categories-section">
            <h2>CATEGORIES</h2>
            <div className="container">
                <div className="categories-wrapper">
                    <Link to="/categories/music" ><div className="music-category">MUSIC</div></Link>
                    <div className="cinema-category"></div>
                    <div className="finearts-category"></div>
                    <div className="photography-category"></div>
                    <div className="literature-category"></div>
                    <div className="fashion-category"></div>
                </div>

            </div>


            
        </section>
    )
}
export default Categories