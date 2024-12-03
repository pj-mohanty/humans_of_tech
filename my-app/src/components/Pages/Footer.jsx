import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">Contact Information</p>
        <p className="footer-subscription-text">
          <strong>Email:</strong> pmohanty@dons.usfca.edu, ajbainton@dons.usfca.edu
        </p>
        <p className="footer-subscription-text">
          <strong>Address:</strong> University of San francisco, San Francisco, CA, USA
        </p>
      </section>
    </footer>
  );
};

export default Footer;

