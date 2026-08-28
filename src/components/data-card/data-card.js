import './data-card.scss'
import { Link } from 'react-router-dom'
import SanitizedHTML from 'react-sanitized-html'
import ReactImageFallback from 'react-image-fallback'
import fallbackImage from '../../assets/no_image.png'
import { ModifiedDateStringBuilder } from '../../utils/'
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
  const [imageStatus, setImageStatus] = React.useState('loading')

  const logoAltText = (() => {
    if (imageStatus === 'fallback') return `No image available for ${dataset.organization_title}`
    return `The logo for ${dataset.organization_title}`
  });


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
            alt={logoAltText(imageStatus, dataset)}
            onError={(errorUrl) => {if (errorUrl === dataset.organization_image_url) setImageStatus('fallback')}}
          />
        </Link>
      </div>
      <div className='details'>
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

function truncateDescription (description, maxLength) {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`
  }

  return description
}

export default DataCard
