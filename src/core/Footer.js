
import React from "react";
import User_footer_in from './User_footer_in';
import { Link, withRouter } from 'react-router-dom';
import {isAuthenticated} from '../auth/index';

const Footer = props => (
    <footer>
        <div className="footer-top">
            <div className="container">
                <ul className="links-footer-list">
                    <li>Reference</li>
                    <li>Who we are</li>
                    <li>What is our porpouse?</li>
                    <li>Help</li>
                    <li>contact</li>
                </ul>
            <div className="spacer-top-header">

            </div>
            <ul className="social-links">
                <li>F</li>
                <li>T</li>
                <li>I</li>
                <li>Y</li>
                <li>RSS</li>
            </ul>
            </div>

        </div>
        <div className="footer-bottom">
            <p>Made with love and redbull by Marc Barrera</p>

        </div>
    

    </footer>
)

export default Footer;