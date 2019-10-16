import { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import './recommendation-list.scss'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { RecommendationUtils } from '../../utils'


const RecommendationList = props => {
  const { recommendations } = props

  const [showTooltipAsCopied, setShowTooltipAsCopied] = useState(false)
  const createHoverText = (systemName) => showTooltipAsCopied ? 'Copied!' : `Copy table name '${systemName}'`

  const recommendationItems = () => {
    return recommendations.map(rec => {
      const tooltipId = `tool-tip-${rec.id}`
      return (
        <div key={rec.id}>
          <a className="recommendation" href={RecommendationUtils.getDatasetUrl(rec)} target='_blank'>
            {rec.dataTitle}
          </a>
          <ReactTooltip
            id={tooltipId}
            place="right"
            effect="solid"
            afterHide={() => setShowTooltipAsCopied(false)}
            getContent={() => createHoverText(rec.systemName)} />
          <CopyToClipboard text={rec.systemName} onCopy={() => setShowTooltipAsCopied(true)}>
            <AssignmentOutlinedIcon data-for={tooltipId} className="copy-table-name-icon" data-tip />
          </CopyToClipboard>
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
