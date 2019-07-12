import './checkbox.scss'
import PropTypes from 'prop-types';

const Checkbox = props => {
  const keyHandler = (e, name) => {
    const SPACEBAR = 32
    if (e.keyCode === SPACEBAR) {
        props.clickHandler(name)
        e.preventDefault()
    }
  }

  return (
    <div
      className='checkbox'
      role='button'
      tabIndex='0'
      key={name}
      onClick={() => props.clickHandler()}
      onKeyDown={(e) => { keyHandler(e, name) }}>
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
  selected: PropTypes.bool.isRequired
}

export default Checkbox
