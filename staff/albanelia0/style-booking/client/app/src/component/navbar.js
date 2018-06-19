import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logic from '../logic'
import '../design/App.css'

class Navbar extends Component {

  state = {
    token: ''
  }

  componentDidMount() {

<<<<<<< HEAD
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        token
      })
    }
    console.log('EEESSSEEEE ==>',token)
=======
    let token = logic.localStorageGetItem("token")
    if (token) {
      this.setState({
        token: token
      })
    }

  }
  logout = (props) =>{

    localStorage.clear()
>>>>>>> feature/style-booking-client

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
                {/* <span className="navbar-burger burger" data-target="navbarMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </span> */}
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">
                  <div className="tabs is-right">
<<<<<<< HEAD
                    {this.state.token?
=======
                    {this.state.token ?
>>>>>>> feature/style-booking-client
                      <ul className="subtitle is-4">
                        <li className="is-active"><Link to="/" >Home</Link></li>
                        <li><a href="">Contacta</a></li>
                        <li><Link to="/profile">Profile</Link></li>
<<<<<<< HEAD
                        <li><Link to="/login">Logout</Link></li>
=======
                        <li onClick={() => this.logout()}><Link to="/">Logout</Link></li> 
>>>>>>> feature/style-booking-client
                      </ul>
                      :
                      <ul className="subtitle is-4">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                      </ul>
                    }
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