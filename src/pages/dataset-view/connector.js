import { connect } from 'react-redux'
import DatasetView from './dataset-view'
import { retrieveDatasetDetails, freestyleQueryUpdate } from '../../store/actions'
import { getDataset, isRemoteDataset } from '../../store/dataset-selectors'

const mapStateToProps = state => {
    return {
        dataset: getDataset(state),
        isRemoteDataset: isRemoteDataset(state)
    }
}

const mapDispatchToProps = dispatch => ({
    retrieveDatasetDetails: (org_name, dataset_name) => dispatch(retrieveDatasetDetails(org_name, dataset_name)),
    setQuery: (query) => dispatch(freestyleQueryUpdate(query)),
    clearQuery: () => dispatch(freestyleQueryUpdate(''))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetView)

