import chartSVG from '../../../assets/chart.svg'
import InlineSVG from 'react-svg-inline'

export default ({ className }) => {
  return (<span className={className}><InlineSVG style={{ marginLeft: '.3rem' }} svg={chartSVG} height='14px' width='25px' accessibilityDesc='Chart' /></span>)
}
