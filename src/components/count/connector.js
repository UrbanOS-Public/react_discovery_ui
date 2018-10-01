import Count from './count'
import { connect } from 'react-redux'
import { getCount } from '../../store/selectors'

const mapStateToProps = state => ({
  data: getCount(state)
})

export default connect(mapStateToProps)(Count)
