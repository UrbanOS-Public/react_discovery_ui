import './data-card.scss'
import { Link } from 'react-router-dom'

const DataCard = props => {
  const fileTypes = (fileTypes) => {
    return fileTypes.map(fileType => <span key={fileType} className='file-type'>{fileType} </span>)
  }

  const dataset = props.dataset
  return (
    <data-card>
      <Link to={`/dataset/${dataset.id}`}>
        <div className='title'>{dataset.title}</div>
      </Link>
      <div className='description'>{dataset.description}</div>
      <div className='file-types'>FILE TYPE: {fileTypes(dataset.fileTypes)} </div>
      <div className='last-modified'>LAST MODIFIED: {dataset.modifiedTime} </div>
    </data-card>
  )
}

export default DataCard
