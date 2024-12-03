import React from 'react';
import './About.css';

const Footer = () => {
  return (
      <div className="footer-box">

          <footer className="about-container">
              <h1>About</h1>
              <section className="footer-subscription">
                  <p>
                      Welcome to Humans of Technology, a digital platform dedicated to celebrating the brilliant minds
                      shaping
                      the world of computing. Our mission is to provide a comprehensive and engaging resource for
                      learning about
                      the lives, achievements, and innovations of computer scientists who have transformed technology
                      and society.
                  </p>
                  <p>
                      We created this platform because we believe that understanding the stories behind technological
                      breakthroughs can inspire the next generation of innovators. Our platform features:
                  </p>
                  <ul>
                      <li>
                          <strong>Detailed Profiles:</strong> Explore in-depth biographies of computer scientists,
                          ranging from
                          pioneers like Ada Lovelace and Alan Turing to modern visionaries like Tim Berners-Lee and
                          Fei-Fei Li.
                      </li>
                      <li>
                          <strong>Achievements and Contributions:</strong> Dive into their groundbreaking work,
                          including
                          algorithms, programming languages, artificial intelligence, and hardware innovations.
                      </li>
                      <li>
                          <strong>Interactive Chats:</strong> You have the flexibility to ask any scientist about
                          themselves.
                      </li>
                      <li>
                          <strong>Inspirational Insights:</strong> Learn about the challenges and triumphs that defined
                          their
                          journeys, offering valuable lessons for aspiring computer scientists.
                      </li>
                  </ul>
              </section>
          </footer>
      </div>
  )
      ;
};

export default Footer;

