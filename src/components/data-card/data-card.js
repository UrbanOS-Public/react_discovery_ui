import './data-card.scss'
import { Link } from 'react-router-dom'
import SanitizedHTML from 'react-sanitized-html'
import ReactImageFallback from 'react-image-fallback';
import fallbackImage from '../../assets/no_image.png';
import loadingImage from '../../assets/loading.gif';
import { ModifiedDateStringBuilder } from '../../utils/';
import LoadingElement from '../../components/generic-elements/loading-element'

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
            initialImage={<LoadingElement />}
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
            {dataset && ModifiedDateStringBuilder.createDateString(dataset)}
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

function truncateDescription(description, maxLength) {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`
  }

  return description
}

export default DataCard
