import './visualize-button.scss'

import Chart from '../../../assets/chart.svg'

import routes from '../../../routes'
import { GeneratedLink } from '../generated-link'

export default ({ organizationName, datasetName, systemName }) => (
  <GeneratedLink path={routes.datasetView} params={{ organizationName, datasetName }} queryStringParams={{ systemName, selectedIndex: 1 }}>
    <div className='visualize-button'>Visualize<Chart style={{ marginLeft: '.3rem' }} height='inherit' accessibilityDesc='Chart' /></div>
  </GeneratedLink>
)
