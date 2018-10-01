import Button from './button'
import { subtractFromCount } from '../../store/actions'

import { connect } from 'react-redux'

const mapStateToProps = () => ({
  symbol: '➖'
})

const mapDispatchToProps = dispatch => ({
  action: () => dispatch(subtractFromCount(1))
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
