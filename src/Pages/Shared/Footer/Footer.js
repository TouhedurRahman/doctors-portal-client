import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../../assets/images/footer.png'

const Footer = () => {
    const date = new Date();
    let year = date.getFullYear();

    return (
        <footer
            className="p-10"
            style={{
                background: `url(${footer})`,
                backgroundSize: 'cover'
            }}
        >
            <div className='footer'>
                <div>
                    <span className="footer-title">Services</span>
                    <Link to="/" className="link link-hover">Emergency Checkup</Link>
                    <Link to="/" className="link link-hover">Monthly Checkup</Link>
                    <Link to="/" className="link link-hover">Weekly Checkup</Link>
                    <Link to="/" className="link link-hover">Deep Checkup</Link>
                </div>
                <div>
                    <span className="footer-title">Oral Health</span>
                    <Link to="/" className="link link-hover">Fluoride Treatment</Link>
                    <Link to="/" className="link link-hover">Cavity Filling</Link>
                    <Link to="/" className="link link-hover">Teath Whitening</Link>
                </div>
                <div>
                    <span className="footer-title">Our Address</span>
                    <Link to="/" className="link link-hover">New York - 101010 Hudson</Link>
                </div>
            </div>
            <div className='text-center mt-16'>
                <p>Copyright © {year} - All right reserved</p>
            </div>
        </footer>
    );
};

export default Footer;