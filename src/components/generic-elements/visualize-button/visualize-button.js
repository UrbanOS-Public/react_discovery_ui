import './visualize-button.scss'

import InlineSVG from 'react-svg-inline'
import chart from '../../../assets/chart.svg'


import routes from '../../../routes'
import { GeneratedLink } from '../generated-link'

export default ({ organizationName, datasetName, systemName }) => (
  <GeneratedLink path={routes.datasetView} params={{ organizationName, datasetName }} queryStringParams={{ systemName, selectedIndex: 1 }}>
    <div className='visualize-button'>Visualize<InlineSVG style={{ 'marginLeft': '.3rem' }} svg={chart} height='inherit' accessibilityDesc='Chart' /></div>
  </GeneratedLink>
)
