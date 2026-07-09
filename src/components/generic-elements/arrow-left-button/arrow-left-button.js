import ArrowLeft from '../../../assets/arrow_left.svg'

const ENABLED_COLOR = '#000000'
const DISABLED_COLOR = '#595959'

export default ({ className, disabled = false, onClick = () => { }, innerClass }) => (
  <button disabled={disabled} aria-label="Previous page" className={`${className} ${disabled ? 'disabled' : ''}`} onClick={onClick}>
    <ArrowLeft className={innerClass} height='inherit' fill={disabled ? DISABLED_COLOR : ENABLED_COLOR} accessibilityDesc='Arrow Left' />
  </button>
)
