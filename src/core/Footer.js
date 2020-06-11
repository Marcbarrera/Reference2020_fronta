import React from "react";
import Instagram from "../images/instagram.png"
import Youtube from "../images/Youtube.png"
import Twitter from "../images/twitter.png"
import Rss from "../images/Rss.png"
import Facebook from "../images/Facebook.png"




const Footer = props => (
    <footer>
        <div className="footer-top">
            <div className="container">
                <ul className="links-footer-list">
                    <li>Reference</li>
                    <li>Who we are?</li>
                    <li>What is our porpouse?</li>
                    <li>Help</li>
                    <li>Contact</li>
                </ul>
            <div className="spacer-top-header">

            </div>
            <ul className="social-links">
                <li><div className="Facebook-icon"><img src={Facebook} alt=""/></div></li>
                <li><div className="Twitter-icon"><img src= {Twitter} alt=""/></div></li>
                <li><div className="Instagram-icon"><img src= {Instagram} alt=""/></div></li>
                <li><div className="Youtube-icon"><img src= {Youtube} alt=""/></div></li>
                <li><div className="Rss-icon"><img src= {Rss} alt=""/></div></li>

            </ul>
            </div>

        </div>
        <div className="footer-bottom">
            <div className="container">
                <p>Made with love and Redbull by Marc Barrera. 2020</p>
            </div>
        </div>
    

    </footer>
)

export default Footer;