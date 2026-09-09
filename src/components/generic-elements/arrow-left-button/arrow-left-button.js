import ArrowLeft from '../../../assets/arrow_left.svg'

const ENABLED_COLOR = '#000000'
const DISABLED_COLOR = '#595959'

const ArrowLeftButton = ({ className, disabled = false, onClick = () => { }, innerClass }) => (
  <button disabled={disabled} aria-label="Previous page" className={`${className} ${disabled ? 'disabled' : ''}`} onClick={onClick}>
    <ArrowLeft className={innerClass} height='inherit' fill={disabled ? DISABLED_COLOR : ENABLED_COLOR} accessibilityDesc='Arrow Left' />
  </button>
)

export default ArrowLeftButton;
