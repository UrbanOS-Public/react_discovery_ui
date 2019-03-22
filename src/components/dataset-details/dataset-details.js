import './dataset-details.scss'
import { QueryStringBuilder } from '../../utils'
import _ from 'lodash'

const DatasetDetails = props => {
  if (!props.dataset) { return <div /> }

  return (
    <dataset-details>
      <div className='name'>{props.dataset.name}</div>
      <div className='description'>{props.dataset.description}</div>
      {!_.isEmpty(props.dataset.keywords) &&
        <div className='keywords'>
          <div className='keyword-label'>KEYWORDS</div>
          {props.dataset.keywords.map(createKeyword)}
        </div>
      }
    </dataset-details>
  )
}

const createKeyword = (name) => <a key={`dataset-keyword-${name}`} className='keyword' href={`/?${QueryStringBuilder.createFilterQueryString('keywords', name)}`}>{name}</a>

export default DatasetDetails
