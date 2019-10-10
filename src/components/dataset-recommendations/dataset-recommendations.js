import PropTypes from 'prop-types';
import './dataset-recommendations.scss'
import CollapsableBox from '../collapsable-box'

const DatasetRecommendations = (props) => {
  const getUrl = (rec) => `/dataset/${rec.orgName}/${rec.dataName}`
  const { datasetId, getRecommendations, recommendations } = props

  const onInit = () => {
    getRecommendations(datasetId)
  }

  React.useEffect(onInit, [])

  const isContentUnavailable = !recommendations || recommendations.length == 0

  if (isContentUnavailable) {
    return (
      <dataset-recommendations />
    )
  }

  return (
    <dataset-recommendations>
      <CollapsableBox title={"Recommended Datasets"} expanded={false}>
        <div className="recommendation-content">
          {recommendations.map(rec =>
            <div className="recommended-dataset" key={rec.id}>
              <a href={getUrl(rec)} target="_blank">{rec.dataTitle}</a>
            </div>)}
        </div>
      </CollapsableBox>
    </dataset-recommendations >
  )
}

DatasetRecommendations.propTypes = {
  datasetId: PropTypes.string.isRequired,
  getRecommendations: PropTypes.func.isRequired,
  recommendations: PropTypes.array
}

export default DatasetRecommendations
