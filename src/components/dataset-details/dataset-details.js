import './dataset-details.scss'
import _ from 'lodash'
import SanitizedHTML from 'react-sanitized-html'
import { QueryStringBuilder } from '../../utils'
import CallToActionButton from '../generic-elements/call-to-action-button'
import { getDefaultFormat } from '../../utils/file-type-utils'

const DatasetDetails = ({ dataset, downloadUrl }) => {
  if (!dataset) {
    return <div />
  }

  return (
    <dataset-details>
      <div className='dataset-details-header'>
        <div data-testid='dataset-title' className='name'>{dataset.title}</div>
        <div className='buttons'>
          <CallToActionButton url={downloadUrl} format={getDefaultFormat(dataset)} filename={dataset.id} sourceType={dataset.sourceType} sourceUrl={dataset.sourceUrl} />
        </div>
      </div>
      <div data-testid='dataset-description' className='description'>
        <SanitizedHTML
          allowedAttributes={{
            a: ['href']
          }}
          allowedTags={['b', 'a', 'ul', 'li', 'ol', 'p', 'em', 'i']}
          html={dataset.description}
        />
      </div>
      {
        !_.isEmpty(dataset.keywords) && (
          <div data-testid="dataset-keywords" className='keywords'>
            <div className='keyword-label'>KEYWORDS</div>
            {dataset.keywords.map(createKeyword)}
          </div>
        )
      }
    </dataset-details >
  )
}

const createKeyword = name => (
  <a
    key={`dataset-keyword-${name}`}
    className='keyword'
    href={`/?${QueryStringBuilder.createFilterQueryString('keywords', name)}`}
  >
    {name}
  </a>
)

export default DatasetDetails
