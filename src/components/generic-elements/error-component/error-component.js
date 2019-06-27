import './error-component.scss'
import Icon from '@material-ui/core/Icon'

const ErrorComponent = props => {
  return (
    <error-component>
      <div className='error-container'>
        <Icon className='error-icon'>
          error_outline
        </Icon>
        <div className='error-text'>{props.errorText}</div>
      </div>
    </error-component>
  )
}

export default ErrorComponent
