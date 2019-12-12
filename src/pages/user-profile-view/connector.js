import { connect } from 'react-redux'
import UserProfileView from './user-profile-view'
import { visualizationsLoadAll } from '../../store/actions'
import { userVisualizations } from '../../store/visualization-selectors'
import withAuth0 from '../../auth/auth0-wrapper'

const mapStateToProps = state => {
  return {
    visualizations: userVisualizations(state),
    loading: state.visualization.loading
  }
}

const mapDispatchToProps = dispatch => ({
  getUserVisualizations: () => dispatch(visualizationsLoadAll())
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(UserProfileView))
