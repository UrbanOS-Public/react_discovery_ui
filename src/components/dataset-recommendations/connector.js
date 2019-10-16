import { connect } from 'react-redux'
import DatasetRecommendations from './dataset-recommendations'
import { getDatasetRecommendations, getDataSet } from '../../store/selectors'
import { datasetRecommendations } from '../../store/actions'

const mapStateToProps = state => {
    return {
        recommendations: getDatasetRecommendations(state),
    }
}

const mapDispatchToProps = dispatch => ({
    getRecommendations: datasetId => dispatch(datasetRecommendations(datasetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetRecommendations)
