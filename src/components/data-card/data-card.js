import './data-card.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import SanitizedHTML from 'react-sanitized-html'
import ReactImageFallback from 'react-image-fallback';
import fallbackImage from '../../assets/no_image.png';
import loadingImage from '../../assets/loading.gif';

const DataCard = props => {
  const maxDescriptionLength = 240
  const fileTypes = fileTypes => {
    return fileTypes.map(fileType => (
      <span key={fileType} className='file-type'>
        {fileType}{' '}
      </span>
    ))
  }

  const dataset = props.dataset
  const truncatedDescription = truncateDescription(
    dataset.description,
    maxDescriptionLength
  )
  return (
    <data-card>
      <div className='logo'>
        <Link
          to={`/dataset/${dataset.organization_name}/${dataset.name}`}
        >
          <ReactImageFallback
            src={dataset.organization_image_url}
            fallbackImage={fallbackImage}
            initialImage={loadingImage}
            alt={`The logo for ${dataset.organization_title}`} />
        </Link>
      </div>
      <div>
        <Link
          className='title'
          to={`/dataset/${dataset.organization_name}/${dataset.name}`}
        >
          {dataset.title}
        </Link>
        <div className='description'>
          <SanitizedHTML
            allowedTags={[]}
            allowedAttributes={{}}
            html={truncatedDescription}
          />
        </div>
        <div className='card-metadata'>
          <div className='last-modified'>
            {dataset && updatedDate(dataset)}
          </div>
          <div className='separator'>•</div>
          <div className='file-types'>
            File Type: {fileTypes(dataset.fileTypes)}{' '}
          </div>
        </div>
      </div>
    </data-card>
  )
}

function updatedDate(dataset) {
  if (dataset.sourceType === "remote") {
    return (<span>Updates to remote datasets are not tracked</span>)
  } else if (dataset.modified) {
    return (<span>Updated {moment(dataset.modified).format('MMM DD, YYYY')}</span>)
  } else {
    return (<span>Update pending</span>)
  }
}

function truncateDescription(description, maxLength) {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`
  }

  return description
}

export default DataCard
