import { connect } from 'react-redux'
import UserProfileView from './user-profile-view'
import { visualizationsLoadAll } from '../../store/actions'
import { userVisualizations, visualizationLoading, visualizationLoadFailure, visualizationLoadSuccess } from '../../store/visualization-selectors'
import withAuth0 from '../../auth/auth0-wrapper'

const mapStateToProps = state => {
  return {
    visualizations: userVisualizations(state),
    loading: visualizationLoading(state),
    loadFailure: visualizationLoadFailure(state),
    loadSuccess: visualizationLoadSuccess(state)
  }
}

const mapDispatchToProps = dispatch => ({
  getUserVisualizations: () => dispatch(visualizationsLoadAll())
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(UserProfileView))
