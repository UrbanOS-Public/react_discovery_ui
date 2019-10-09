import PropTypes from 'prop-types';
import './dataset-recommendations.scss'
import CollapsableBox from '../collapsable-box'
import LoadingElement from '../../components/generic-elements/loading-element'

const DatasetRecommendations = (props) => {
  const getUrl = (rec) => `/dataset/${rec.orgName}/${rec.dataName}`
  const { datasetId, getRecommendations, recommendations } = props

  const onInit = () => {
    console.log(datasetId)
    getRecommendations(datasetId)
  }

  React.useEffect(onInit, [])

  const isPageLoading = !recommendations

  if (isPageLoading) {
    return (
      <dataset-recommendations>
        <LoadingElement />
      </dataset-recommendations>
    )
  }

  return (
    <dataset-recommendations>
      <CollapsableBox title={"Recommended Datasets"} expanded={false}>
        {recommendations.map(rec =>
          <div className="recommended-dataset" key={rec.id}>
            <a href={getUrl(rec)} target="_blank">{rec.dataTitle}</a>
          </div>)}
      </CollapsableBox>
    </dataset-recommendations >
  )
}

DatasetRecommendations.propTypes = {
  datasetId: PropTypes.string.isRequired,
  recommendations: PropTypes.array
}

export default DatasetRecommendations
