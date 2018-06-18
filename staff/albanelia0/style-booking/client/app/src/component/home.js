import React, { Component } from 'react';
import {Dropdown} from './dropdown'
import '../design/home.css'
import img from '../design/logofucsia-1.png'
// import 'bulma/js/bulma.js';

const images = [
  '/images/0.jpg',
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
]

class Home extends Component {

  state = {
    image: '/images/0.jpg'
  }

  componentDidMount() {
    this._handleImages()
  }

  _handleImages = () => {
    setInterval(() => {
      let i = images.indexOf(this.state.image)
      i = (i + 1) % images.length;
      this.setState({
        image: images[i]
      })
    }, 3000)
  }

  render() {
    return (
      <section className="hero is-fullheight is-default is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
          <section class="hero is-small">
            <div class="hero-body">
              <div className="container summary">
                  <p className="subtitle">
                    <h3>SCHEDULE: From Monday to Saturday from 8 am to 5 pm</h3> 
                  ask for an appointment!
                  We will do our best to satisfy your wishes!</p>
              </div>
            </div>
          </section>
            <div className="columns is-vcentered">
              <div className="column is-5">
                <figure className="image">
                  {/* <img src={this.state.image} alt="Description" /> */}
                  <div
                    className="the-image"
                    style={{ backgroundImage: `url(${this.state.image})` }}
                  />
                </figure>
              </div>
              <div className="column is-6 is-offset-1">
                <p className="subtitle is-1 is-spaced">Available days</p>
                <Dropdown/>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <div className="container">
            <div className="tabs is-centered">
              <ul>
                <li><a>And this is the bottom</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* <script src="../js/bulma.js"></script> */}
      </section>
    )
  }
}

export default Home;
