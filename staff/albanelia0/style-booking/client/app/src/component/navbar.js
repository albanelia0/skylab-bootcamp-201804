import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logic from '../logic'
import '../design/App.css'

class Navbar extends Component {

  state = {
    token: ''
  }

  componentDidMount() {

    // let token = logic.getToken(token)
    // if (token) {
    //   this.setState({
    //     token: token
    //   })
    // }

  }


  render() {
    return (
      <div>
        <div className="hero-head  header">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <div className="logo">
                  <p className="subtitle">Victoria Style</p>
                </div>
                <span className="navbar-burger burger" data-target="navbarMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">
                  <div className="tabs is-right">
                    <ul className="subtitle is-4">
                      {/* {this.state.token.length > 0 ? */}
                      <li className="is-active"><Link to="/" >Home</Link></li>
                      <li><a href="">Contacta</a></li>
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link to="/login">Login</Link></li>
                      {/* :
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/login">Login</Link></li>  */}
                      {/* } */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default Navbar