import { connect } from 'react-redux'
import VisualizationView from './visualization-view'
import { getVisualization, resetVisualization, createVisualization } from '../../store/actions'
import { selectVisualization } from '../../store/selectors'
import { getFreestyleQueryText } from '../../store/query-selectors'

const mapStateToProps = state => {
    return {
        visualization: selectVisualization(state),
        query: getFreestyleQueryText(state)
    }
}

const mapDispatchToProps = dispatch => ({
    getVisualization: (id) => dispatch(getVisualization(id)),
    resetVisualization: () => dispatch(resetVisualization()),
    createVisualization: (title, query) => dispatch(createVisualization(title, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationView)

