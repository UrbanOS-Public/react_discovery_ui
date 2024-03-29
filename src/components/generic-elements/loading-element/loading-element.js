import './loading-element.scss'
import InlineSVG from 'react-svg-inline'
import loadingIcon from '../../../assets/loadingicon.svg'

const LoadingElement = ({ className = '' }) => {
  return (
    <loading-element class={`loading-container ${className}`} data-testid='loading-spinner'>
      <InlineSVG svg={loadingIcon} accessibilityDesc='Loading...' />
    </loading-element>
  )
}

export default LoadingElement
