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
    return recommendations.map(recommendation => {
      return (
        <div key={recommendation.id}>
          <ReactTooltip
            id={recommendation.id}
            effect='solid'
            afterHide={() => setShowTooltipAsCopied(false)}
            getContent={[() => createHoverText(recommendation.systemName)]}
          />
          <CopyToClipboard text={recommendation.systemName} className='action copy-table-name-icon' onCopy={() => onCopyClick()}>
            <FilterNoneIcon data-for={recommendation.id} data-tip='' />
          </CopyToClipboard>
          <div className='recommendation'>
            <a role="link" href={RecommendationUtils.getDatasetUrl(recommendation)} target='_blank' className='action'>
              {recommendation.dataTitle}
            </a>
          </div>
        </div>
      )
    })
  }

  return (
    <recommendation-list>
      <div className='list-box'>
        {recommendationItems()}
      </div>
    </recommendation-list>
  )
}

RecommendationList.propTypes = {
  recommendations: PropTypes.array
}

export default RecommendationList
