import './data-card.scss'

const DataCard = props => {
  const fileTypes = (fileTypes) => {
    return fileTypes.map(fileType => <span key={fileType} className='file-type'>{fileType} </span>)
  }

  return (
    <data-card>
      <div className='datacard-container'>
        <div className='title'>{props.title}</div>
        <div className='description'>{props.description}</div>
        <div className='file-types'>FILE TYPE: {fileTypes(props.fileTypes)} </div>
      </div>
    </data-card>
  )
}

export default DataCard
