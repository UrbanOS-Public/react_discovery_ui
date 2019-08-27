import './dataset-details.scss'
import _ from 'lodash'
import SanitizedHTML from 'react-sanitized-html'

import { Link } from 'react-router-dom'

import { QueryStringBuilder } from '../../utils'

import DownloadButton from '../generic-elements/download-button'
import VisualizeButton from '../generic-elements/visualize-button';

const DatasetDetails = ({ dataset }) => {
  if (!dataset) {
    return <div />
  }

  return (
    <dataset-details>
      <div className='header'>
        <div className='name'>{dataset.title}</div>
        <div className='buttons'>
          {renderVisualizeButton(dataset)}
          {renderDownloadButton(dataset)}
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

function renderDownloadButton(dataset) {
  const formats = {
    gtfs: 'json'
  }
  let sourceFormat = formats[dataset.sourceFormat] || dataset.sourceFormat
  let nonRemoteUrl = `${window.API_HOST}/api/v1/dataset/${
    dataset.id
    }/download?_format=${sourceFormat}`
  let url = dataset.sourceType === 'remote' ? dataset.sourceUrl : nonRemoteUrl
  return <DownloadButton url={url} />
}

const renderVisualizeButton = (dataset) => 'isApiAccesible' && <VisualizeButton url={`${dataset.name}/visualization`} />

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
