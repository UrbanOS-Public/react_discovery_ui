import './dataset-details.scss'
import { QueryStringBuilder } from '../../utils'

const DatasetDetails = props => {
  if (!props.dataset) { return <div /> }

  return (
    <dataset-details>
      <div className='name'>{props.dataset.name}</div>
      <div className='description'>{props.dataset.description}</div>
      { props.dataset.tags &&
        <div className='tags'>
          <div className='tag-label'>TAGS</div>
          {props.dataset.tags.map(createTag)}
        </div>
      }
      <div className='data-and-resources-header'>Data & Resources</div>
      <div className='resources'>{props.dataset.resources}</div>
      <a className='download-dataset' href={`${window.API_HOST}/v1/api/dataset/${props.dataset.id}/csv`}>Download Dataset</a>
    </dataset-details>
  )
}

const createTag = ({ name }) => <a key={`dataset-tag-${name}`} className='tag' href={`/?${QueryStringBuilder.createFilterQueryString('tags', name)}`}>{name}</a>

export default DatasetDetails
