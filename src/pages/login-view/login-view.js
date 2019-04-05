import { useState } from 'react'
import './login-view.scss'

const LoginView = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const enterKeyLogin = (event) => event.key === 'Enter' && login()
  const spaceKeyLogin = (event) => event.key === ' ' && login()
  const login = () => props.login({ username, password, history: props.history })

  return (
    <login-view>
      <div className='box' onKeyPress={enterKeyLogin}>
        <h3>Restricted Dataset Login</h3>
        <div>This area of the operating system is restricted to authorized users only.</div>
        {props.lastAttemptFailed && <div className='error-message'>Username/ password invalid.</div>}
        <label htmlFor='username'>Username</label>
        <input id='username' className='username' type='text' tabIndex={1} value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='password'>Password</label>
        <input id='password' className='password' type='password' tabIndex={2} value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='submit' role='button' tabIndex={3} onClick={login} onKeyPress={spaceKeyLogin}>Login</div>
      </div>
    </login-view>
  )
}
export default LoginView
