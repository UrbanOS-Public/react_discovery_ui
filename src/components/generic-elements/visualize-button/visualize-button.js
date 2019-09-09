import './visualize-button.scss'

import InlineSVG from 'react-svg-inline'
import chart from '../../../assets/chart.svg'


import routes from '../../../routes'
import { GeneratedLink } from '../generated-link'

export default ({ organizationName, datasetName }) => (
  <GeneratedLink path={routes.datasetVisualizationView} params={{ organization_name: organizationName, dataset_name: datasetName }}>
    <div className='visualize-button'>Visualize<InlineSVG style={{ 'marginLeft': '.3rem' }} svg={chart} height='inherit' width={'25'} accessibilityDesc='Chart' /></div>
  </GeneratedLink>
)
