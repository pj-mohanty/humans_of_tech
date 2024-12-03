import React from 'react';
import './HeroSection.css';
import '../App.css';
import { Button } from './Button';
import {useNavigate} from "react-router-dom";
import "./Pages/Personpage";

const HeroSection= () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('./Personpage');
    };

  return (
    <div className='Hero-container'>
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>Humans Of Technology</h1>
      <p>Revolutionizing the future with technology.</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleNavigation}
        >
          Talk To Inventors
        </Button>
      </div>
    </div>
  )
}
export default HeroSection
