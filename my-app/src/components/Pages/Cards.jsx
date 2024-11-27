import React from 'react';
import './Cards.css';
import CardItem from './CardItem';


function Cards() {
  return (
    <div className='cards'>
      <h1>The Innovators!</h1>
      <h2>Ever tried to know who changed the world?</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/videos/scientist.jpg'
              text='Explore the greatest mind in technology'
              label='Great scientist'
              path='/Personpage'
            />
            <CardItem
              src='/videos/women in tech.jpeg'
              text='Influencial women in technology'
              label='women in tech'
              path='/Personpage'
            />
            <CardItem
              src='/videos/Search yourself.jpg'
              text='Can not find the person you are looking for? no worries! Search Here!!'
              label='explore'
              path='/SearchName'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;