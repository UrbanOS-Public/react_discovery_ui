import './data-card.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import SanitizedHTML from 'react-sanitized-html'
import ReactImageFallback from "react-image-fallback";
import fallbackImage from '../../assets/org_image_unavailable.png'

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
          {/* <img src={dataset.organization_image_url} alt={`The logo for ${dataset.organization_title}`} /> */}
          <ReactImageFallback
            src={dataset.organization_image_url}
            fallbackImage={fallbackImage}
            initialImage={fallbackImage}
            alt={`The logo for ${dataset.organization_title}`}
            className="my-image" />
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
            Updated {moment(dataset.modifiedTime).format('MMM DD, YYYY')}
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
