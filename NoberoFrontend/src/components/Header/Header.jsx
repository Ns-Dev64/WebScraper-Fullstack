import React from 'react';
import './Header.css'; // Assuming you'll extract related styles into this file
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar';
const Header = () => {
  return (
    <>
    <AnnouncementBar></AnnouncementBar>
    <header id="header" className="site-header">
      <div id="header-main" className="header-main">
        <div className="row large-row">
          <div id="site-title" className="site-title">
            <a href="/" className="custom-logo-link" rel="home">
              <img
                width="72"
                height="30"
                src="https://nobero.com/cdn/shop/files/Nobero_logo_1_2.svg?v=1694697396"
                className="menu"
                alt="Website Logo"
              />
            </a>
          </div>
          <nav id="site-navigation" className="main-navigation">
            <div className="main-nav-wrapper">
              <ul id="primary-menu" className="menu">
                <li className="menu-item">
                  <a href="/about">About Us</a>
                </li>
                <li className="menu-item">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
                </>
  );
};

export default Header;
