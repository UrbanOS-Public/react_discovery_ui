import { useState } from 'react'
import { Redirect } from 'react-router'
import './login-view.scss'

const LoginView = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const enterKeyLogin = (event) => event.key === 'Enter' && login()
  const spaceKeyLogin = (event) => event.key === ' ' && login()
  const login = () => props.login({ username, password, history: props.history })
  return (
    sessionStorage.getItem('api-token')
      ? <Redirect
          to={{
            pathname: '/'
          }}
        />
      : <login-view>
        <div className='box' onKeyPress={enterKeyLogin}>
          <h3>Restricted Dataset Login</h3>
          <div>This area is restricted to authorized users only.</div>
          {props.lastAttemptFailed && <div className='error-message'>Username and/or password invalid.</div>}
          <label htmlFor='username'>Username</label>
          <input id='username' className='username' type='text' tabIndex={1} value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          <label htmlFor='password'>Password</label>
          <input id='password' className='password' type='password' tabIndex={2} value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className='login-row'>
            <a href={`https://www.${window.BASE_URL}/reset-password`}>Forgot your username and/or password?</a>
          </div>
          <div className='submit' role='button' tabIndex={3} onClick={login} onKeyPress={spaceKeyLogin}>Login</div>
        </div>
      </login-view>
  )
}
export default LoginView
