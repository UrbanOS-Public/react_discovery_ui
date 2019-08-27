import './visualize-button.scss'

import InlineSVG from 'react-svg-inline'
import { Link } from 'react-router-dom'

import chart from '../../../assets/chart.svg'


export default ({ url }) => (
  <Link to={url}>
    <div className='visualize-button'>Visualize<InlineSVG style={{ 'marginLeft': '.3em' }} svg={chart} height='inherit' width={'25'} accessibilityDesc='Chart' /></div>
  </Link>
)
