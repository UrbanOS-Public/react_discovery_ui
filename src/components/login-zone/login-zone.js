import './login-zone.scss'

import Login from './login'
import Logout from './logout'

const LoginZone = props => {
  const logout = () => props.logout({ history: props.history })
  return (
    <login-zone>
      {props.token ? <Logout logout={logout} /> : <Login />}
    </login-zone>
  )
}

export default LoginZone
