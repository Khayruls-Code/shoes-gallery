import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <NavLink to='/home' className="navbar-brand uppercase font-bold" href="/">Shoe Gallery</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item py-2 ml-4">
              <NavLink to='home' className="nav-link font-medium" aria-current="page" >Home</NavLink>
            </li>
            <li className="nav-item py-2 ml-4">
              <NavLink to='/explore' className="nav-link font-medium" aria-current="page">Explore More</NavLink>
            </li>
            <li className="nav-item py-2 ml-4">
              <NavLink to='/home' className="nav-link font-medium" aria-current="page">Contact</NavLink>
            </li>
            <li className="nav-item py-2 ml-4">
              <button className='px-4 rounded-md text-white font-semibold py-2 bg-primary_bg'>Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;