import './error-component.scss'

const ErrorComponent = props => {
  return (
    <error-component>
      <div className='error-container'>
        <div className='error-text'>{props.errorText}</div>
      </div>
    </error-component>
  )
}

export default ErrorComponent
