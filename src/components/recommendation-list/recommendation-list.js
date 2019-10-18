import { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import './recommendation-list.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { RecommendationUtils } from '../../utils'
import FilterNoneIcon from '@material-ui/icons/FilterNone'

const RecommendationList = props => {
  const { recommendations } = props

  const [showTooltipAsCopied, setShowTooltipAsCopied] = useState(false)
  const createHoverText = (systemName) => showTooltipAsCopied ? 'Copied!' : `Copy table name '${systemName}'`

  const onCopyClick = () => {
    setShowTooltipAsCopied(true)
  }

  const recommendationItems = () => {
    return recommendations.map(rec => {
      return (
        <div key={rec.id}>
          <ReactTooltip
            id={rec.id}
            effect="solid"
            afterHide={() => setShowTooltipAsCopied(false)}
            getContent={[() => createHoverText(rec.systemName)]}
          />
          <CopyToClipboard text={rec.systemName} className="copy-table-name-icon" onCopy={() => onCopyClick()}>
            <FilterNoneIcon data-for={rec.id} data-tip='' />
          </CopyToClipboard>
          <div className="recommendation">
            <a href={RecommendationUtils.getDatasetUrl(rec)} target='_blank'>
              {rec.dataTitle}
            </a>
          </div>
        </div>)
    })
  }

  return (
    <recommendation-list>
      <div className="list-box">
        {recommendationItems()}
      </div>
    </recommendation-list >
  )
}

RecommendationList.propTypes = {
  recommendations: PropTypes.array
}

export default RecommendationList
