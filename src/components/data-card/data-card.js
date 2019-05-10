import "./data-card.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import SanitizedHTML from "react-sanitized-html";

const DataCard = props => {
  const max_description_length = 240
  const fileTypes = fileTypes => {
    return fileTypes.map(fileType => (
      <span key={fileType} className='file-type'>
        {fileType}{' '}
      </span>
    ))
  }

  const dataset = props.dataset;
  const truncatedDescription = truncateDescription(
    dataset.description,
    max_description_length
  );
  return (
    <data-card>
      <Link
        className='title'
        to={`/dataset/${dataset.organization_name}/${dataset.name}`}
      >
        {dataset.title}
      </Link>
      <div className="description">
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
    </data-card>
  )
}

function truncateDescription(description, max_length) {
  if (description.length > max_length) {
    return `${description.substring(0, max_length)}...`;
  }

  return description;
}

export default DataCard;
