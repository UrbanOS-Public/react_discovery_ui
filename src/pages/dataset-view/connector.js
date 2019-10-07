import { connect } from 'react-redux'
import DatasetView from './dataset-view'
import { retrieveDatasetDetails, freestyleQueryUpdate } from '../../store/actions'
import { getDataSet } from '../../store/selectors'

const mapStateToProps = state => {
    return {
        dataset: getDataSet(state)
    }
}

const mapDispatchToProps = dispatch => ({
    retrieveDatasetDetails: (org_name, dataset_name) => dispatch(retrieveDatasetDetails(org_name, dataset_name)),
    setQuery: (query) => dispatch(freestyleQueryUpdate(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetView)

