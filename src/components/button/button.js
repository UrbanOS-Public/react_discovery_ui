import './button.scss'

export default (props) => (
  <button-element>
    <button onClick={props.action}>{props.buttonText}</button>
  </button-element>
)
