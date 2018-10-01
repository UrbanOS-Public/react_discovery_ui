import './button.scss'

export default (props) => (
  <button-element>
    <button className='blarg' onClick={props.action}>{props.symbol}</button>
  </button-element>
)
