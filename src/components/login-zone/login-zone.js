import './login-zone.scss'
import InlineSVG from 'react-svg-inline'
import { Link } from 'react-router-dom'
import arrow from '../../assets/ic_arrow.svg'

const LoginZone = props => {
  const logout = () => props.logout({ history: props.history })

  return (
    <login-zone>
      <h3>RESTRICTED DATASETS</h3>
      <p>
        These datasets are limited to authorized users only.
      </p>

      { !props.token
        ? <Link
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
        LOG IN
          <InlineSVG
            className='login-arrow'
            svg={arrow}
            height='inherit'
            accessibilityDesc='Arrow' />
        </Link>
        : <button
          onClick={logout}>
        LOG OUT
          <InlineSVG
            className='login-arrow'
            svg={arrow}
            height='inherit'
            accessibilityDesc='Arrow' />
        </button>}
    </login-zone>

  )
}

export default LoginZone
