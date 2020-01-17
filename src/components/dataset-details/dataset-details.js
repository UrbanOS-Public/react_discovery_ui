import './dataset-details.scss'
import _ from 'lodash'
import SanitizedHTML from 'react-sanitized-html'
import { QueryStringBuilder } from '../../utils'
import DownloadButton from '../generic-elements/download-button'
import { getDefaultFormat } from '../../utils/file-type-utils'

const DatasetDetails = ({ dataset, downloadUrl }) => {
  if (!dataset) {
    return <div />
  }

  return (
    <dataset-details>
      <div className='header'>
        <div className='name'>{dataset.title}</div>
        <div className='buttons'>
          <DownloadButton url={downloadUrl} format={getDefaultFormat(dataset)} filename={dataset.id}/>
        </div>
      </div>
      <div className='description'>
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
          <div className='keywords'>
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
