import { connect } from 'react-redux'
import DatasetView from './dataset-view'
import { retrieveDatasetDetails, clearDatasetDetails, clearDatasetPreview } from '../../store/actions'
import { getDataSet, getDataSetError } from '../../store/selectors'

const mapStateToProps = state => {
    return {
        dataset: getDataSet(state)
    }
}

const mapDispatchToProps = dispatch => ({
    retrieveDatasetDetails: (org_name, dataset_name) => dispatch(retrieveDatasetDetails(org_name, dataset_name))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetView)

