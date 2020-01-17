import './dataset-details.scss'
import _ from 'lodash'
import SanitizedHTML from 'react-sanitized-html'
import { QueryStringBuilder } from '../../utils'
import DownloadButton from '../generic-elements/download-button'
import AuthenticatedLink from '../authenticated-link'
import { getDefaultFormat } from '../../utils/file-type-utils'


const DatasetDetails = ({ dataset, downloadUrl }) => {
  if (!dataset) {
    return <div />
  }

  return (
    <dataset-details>
      <AuthenticatedLink url={downloadUrl} format={getDefaultFormat(dataset)} filename={dataset.id} >Download</AuthenticatedLink>
      <div className='header'>
        <div className='name'>{dataset.title}</div>
        <div className='buttons'>
          {/* Clicking on this link is launching the normal download instead of doing the steps we want. */}
          {/* <DownloadButton url={downloadUrl} /> */}
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
