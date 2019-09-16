import LoadingElement from '../generic-elements/loading-element'
import ErrorComponent from '../generic-elements/error-component'
import './network-loading-element.scss'
import { useAuth0 } from '../../auth/react-auth0-wrapper'

const NETWORK_ERROR_TEXT = 'We were unable to fetch the datasets, please refresh the page to try again'

export default ({ networkLoading, hasNetworkError }) => {
  const loading = isLoading(networkLoading)
  const loadingElement = loading && <LoadingElement />
  const errorElement = hasNetworkError && <ErrorComponent errorText={NETWORK_ERROR_TEXT} />
  const displayClass = !(loading || hasNetworkError) ? 'hidden' : ''

  return (
    <network-loading-element class={displayClass}>
      {errorElement || loadingElement}
    </network-loading-element>
  )
}

const isLoading = networkLoading => {
  const { loading: auth0Loading } = useAuth0()
  return networkLoading || auth0Loading
}
