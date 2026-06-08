import ArrowRight from '../../../assets/arrow_right.svg'

const ENABLED_COLOR = '#000000'
const DISABLED_COLOR = '#595959'

export default ({ className, disabled = false, onClick = () => { }, innerClass }) => (
  <button disabled={disabled} className={`${className} ${disabled ? 'disabled' : ''}`} onClick={onClick}>
    <ArrowRight className={innerClass} height='inherit' fill={disabled ? DISABLED_COLOR : ENABLED_COLOR} accessibilityDesc='Arrow Right' />
  </button>
)
