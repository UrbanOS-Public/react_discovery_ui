import './checkbox.scss';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const keyHandler = (e) => {
    const SPACEBAR = 32
    if (e.keyCode === SPACEBAR) {
        handleClick()
        e.preventDefault()
    }
  }

  const handleClick = () => {
    if(!props.disabled) {
      props.clickHandler()
    }
  }

  return (
    <div
      className={`checkbox ${props.disabled ? 'disabled' : ''}`}
      role='button'
      tabIndex='0'
      key={name}
      onClick={() => handleClick()}
      onKeyDown={(e) => keyHandler(e)}>
      <span className={`checkbox-indicator ${props.selected ? 'selected' : ''}`}>
        {props.selected && <div className='checkmark' />}
      </span>
      <span className='checkbox-label wrapped-text'>
        {props.text}
      </span>
    </div>
  )
}

Checkbox.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  disabled: PropTypes.bool
}

export default Checkbox
