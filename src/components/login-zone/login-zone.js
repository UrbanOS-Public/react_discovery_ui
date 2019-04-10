import './login-zone.scss'
import InlineSVG from 'react-svg-inline'
import { Link } from 'react-router-dom'
import arrow from '../../assets/ic_arrow.svg'

export default () => {
  return (
    <login-zone>
      <h3>RESTRICTED DATASETS</h3>
      <p>
        These datasets are limited to authorized users only.
      </p>
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
        LOG IN
        <InlineSVG
          className='login-arrow'
          svg={arrow}
          height='inherit'
          accessibilityDesc='Arrow' />
      </Link>
    </login-zone>
  )
}
