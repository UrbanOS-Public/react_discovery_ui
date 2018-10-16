import './dataset-details.scss'

const DatasetDetails = props => {
  if (!props.dataset) { return <div /> }

  return (
    <dataset-details>
      <div className='name'>{props.dataset.name}</div>
      <div className='description'>{props.dataset.description}</div>
      <div className='tags'>
        <div className='tag-label'>TAGS</div>
        {props.dataset.tags.map(tag => <div key={`dataset-tag-${tag}`} className='tag'>{tag}</div>)}
      </div>
      <div className='data-and-resources-header'>Data & Resources</div>
      <div className='resources'>{props.dataset.resources}</div>
    </dataset-details>
  )
}

export default DatasetDetails
