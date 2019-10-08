import { connect } from 'react-redux'
import VisualizationView from './visualization-view'
import { getVisualization, resetVisualization } from '../../store/actions'
import { selectVisualization } from '../../store/selectors'

const mapStateToProps = state => {
    return {
        visualization: selectVisualization(state)
    }
}

const mapDispatchToProps = dispatch => ({
    getVisualization: (id) => dispatch(getVisualization(id)),
    resetVisualization: () => dispatch(resetVisualization())
})

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationView)

