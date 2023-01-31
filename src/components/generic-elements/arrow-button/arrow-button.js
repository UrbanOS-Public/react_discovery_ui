import InlineSVG from 'react-svg-inline'
import arrow from '../../../assets/arrow.svg'

const ENABLED_COLOR = '#000000'
const DISABLED_COLOR = '#595959'

export default ({ className, disabled = false, onClick = () => { }, innerClass }) => (
  <button disabled={disabled} className={`${className} ${disabled ? 'disabled' : ''}`} onClick={onClick}>
    <InlineSVG className={innerClass} svg={arrow} height='inherit' fill={disabled ? DISABLED_COLOR : ENABLED_COLOR} accessibilityDesc='Arrow' />
  </button>
)
