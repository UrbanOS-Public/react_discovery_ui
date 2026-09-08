import { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginSvgsAndText from './login-svgs-and-text'

class Login extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <login-component>
        <Link
          to={{
            pathname: '/login',
            state: {
              from: {
                pathname: window.location.pathname,
                search: window.location.search
              }
            }
          }}
        >
          <LoginSvgsAndText text='LOG IN' />
        </Link>
      </login-component>
    )
  }
}

export default Login;
