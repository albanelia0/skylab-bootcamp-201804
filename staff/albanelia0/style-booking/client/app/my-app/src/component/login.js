import React, { Component } from 'react'
import 'react-router-dom'
import swal from 'sweetalert2'
import logic from '../logic'


export class Login extends Component {

  state = {
    email: '',
    password: '',
    formIsFull: false,
    conditionForGoToHome: false
  }

  handleChange = (e) => {

    const { name, value } = e.target

    this.setState({
      [name]: value
    },
      () => {
        this.setState({
          formIsFull: this.state.email && this.state.password ? true : false
        })
      }
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { email, password, formIsFull } = this.state

    if (formIsFull) {

      const body = {
        "email": email,
        "password": password
      }

      logic.login(body).then(result => {
        console.log(result)

        if (result) {
          this.setState({
            conditionForGoToHome: true
          })

          this.storageUserData(result)
          localStorage.setItem("password", password)
        }
      })

      this.setState({
        email: '',
        password: ''
      })
    }
  }

  goToHome =() =>{
    
    if (this.state.conditionForGoToHome) {
      this.props.history.push('./home')
    } else {
      swal({
        type: 'error',
        title: 'Something went wrong!',
      })
    }
  }

  storageUserData(result) {
    localStorage.setItem('token', result.token)
    localStorage.setItem('id', result.id)
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-grey">Login</h3>
              <p className="subtitle has-text-grey">Please login to proceed.</p>
              <div className="box">
                <figure className="avatar">
                  <img src="https://placehold.it/128x128" alt="" />
                </figure>
                <form>
                  <div className="field">
                    <div className="control">
                      <input onChange={this.handleChange} name='email' className="input is-large" type="email" placeholder="Your Email" autofocus="" value={this.state.email}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input onChange={this.handleChange} name='password' className="input is-large" type="password" placeholder="Your Password" value={this.state.password} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  {this.state.conditionForGoToHome ? <button type="submit" onClick={this.goToHome} className="button is-block is-info is-large is-fullwidth">Login</button> :
                    <button type="submit" onClick={this.handleSubmit} className="button is-block is-info is-large is-fullwidth " title="Disabled button" disabled={!this.state.formIsFull}>Login</button>
                  }
                </form>
              </div>
              <p className="has-text-grey">
                <a onClick={this.goToHome}>Go to home</a> &nbsp;·&nbsp;
                <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                <a href="../">Need Help?</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

}
