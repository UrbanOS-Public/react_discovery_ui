import LoadingElement from '../loading-element'
import ErrorComponent from '../error-component'
import './network-loading-element.scss'

const NETWORK_ERROR_TEXT = 'We were unable to fetch the datasets, please refresh the page to try again'

export default ({ isLoading, hasNetworkError }) => {
  const loadingElement = isLoading && <LoadingElement />
  const errorElement = hasNetworkError && <ErrorComponent errorText={NETWORK_ERROR_TEXT} />
  const displayClass = !(isLoading || hasNetworkError) ? 'hidden' : ''

  return (
    <network-loading-element class={displayClass}>
      {errorElement || loadingElement}
    </network-loading-element>
  )
}
