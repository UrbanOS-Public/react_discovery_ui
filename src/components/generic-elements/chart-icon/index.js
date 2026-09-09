import ChartSVG from '../../../assets/chart.svg'

const ChartIcon = ({ className }) => {
  return (<span className={className}><ChartSVG style={{ marginLeft: '.3rem' }} height='14px' width='25px' accessibilityDesc='Chart' /></span>)
}

export default ChartIcon;
