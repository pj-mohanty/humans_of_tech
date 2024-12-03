import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  // Toggles the mobile menu
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Show or hide the Sign-In button based on screen width
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // Add event listener for window resize
  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', showButton);
  }, []);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            HOFT
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/About' className='nav-links' onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/Footer' className='nav-links' onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/SignIn' className='nav-links' onClick={closeMobileMenu}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;