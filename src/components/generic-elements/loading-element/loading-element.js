import './loading-element.scss'
import LoadingIcon from '../../../assets/loadingicon.svg'

const LoadingElement = ({ className = '' }) => {
  return (
    <loading-element class={`loading-container ${className}`} data-testid='loading-spinner'>
      <LoadingIcon accessibilityDesc='Loading...' />
    </loading-element>
  )
}

export default LoadingElement
