import sqlSVG from '../../../assets/blk-database.svg'
import InlineSVG from 'react-svg-inline'

export default ({ className }) => {
  return (<span className={className}><InlineSVG svg={sqlSVG} height='14px' width='14px' accessibilityDesc='Sql Icon' /></span>)
}
