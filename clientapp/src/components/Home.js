import React, { Component } from 'react';
import '../styles/Home.css';
import albums from '../assets/mots7.jpg';
import lightsticks from '../assets/armybomb.jpg';
import posters from '../assets/rj.jpg';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="storefront">
      <h1>Welcome to KShoppe!</h1>
      <p>Your one-stop shop for all KPOP merchandise.</p>
      <div className="products">
        <div className="product">
        <a href="/shop-items"><img src={albums} alt="Album" /></a>
        <h2>Albums</h2>
        <p>Find the latest albums from your favorite KPOP artists.</p>
        </div>
        <div className="product">
        <a href="/shop-items"><img src={lightsticks} alt="Lightstick" /></a>
        <h2>Lightsticks</h2>
        <p>Get official lightsticks to show your support at concerts.</p>
        </div>
        <div className="product">
        <a href="/shop-items"><img src={posters} alt="Poster" /></a>
        <h2>Merch</h2>
        <p>Decorate your space with other merch of your favorite idols.</p>
        </div>
      </div>
      </div>
    );
  }
}
