import React from 'react'
import {Link} from 'react-router-dom'
import music from '../images/music2.jpg'
import cinema from '../images/cinema1.jpg'
import paint from '../images/paint1.jpg'
import photography from '../images/photography1.jpg'
import literature from '../images/literature1.jpg'
import fashion from '../images/fashion2.jpg'




 function Categories() {
    return (
        <section className="categories-section">
            <h2>CATEGORIES</h2>
            <div className="container">
                <div className="categories-wrapper">
                    
                        <div className="music-category">
                        <Link  to="/categories/music">

                            <img src={music}/>
                            <span>music</span>
                            </Link>
                        </div>
                        

                         
                         <div className="cinema-category">  
                         <Link  to="/categories/cinema">   
                            <img src={cinema} /><span>cinema</span>
                        </Link>

                        </div>
                            
                        <div className="finearts-category">
                            <Link  to="/categories/painting">
                            <img src={paint} /><span>Painting</span>
                            </Link>

                        </div>
                    <Link className="photography-category" to="/categories/photography">
                        <div>
                            <img src={photography} /><span>photography</span>
                        </div>
                    </Link>
                    <Link className="literature-category" to="/categories/literature">
                        <div>
                            <img src={literature} /><span>literature</span>
                        </div>
                    </Link>
                    <Link className="fashion-category" to="/categories/fashion">
                        <div>
                            <img src={fashion} /><span>fashion</span>
                        </div>
                    </Link>
                    
                    
                </div>

            </div>


            
        </section>
    )
}
export default Categories