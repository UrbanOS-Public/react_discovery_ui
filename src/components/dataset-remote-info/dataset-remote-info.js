import './dataset-remote-info.scss'

export default ({ datasetSourceUrl }) => (
  <dataset-remote-info>
    <div class='header-container'>
      <div class='remote-info-header'>Remote Dataset</div>
      <div>URL below will open in a new window</div>
    </div>
    <a href={datasetSourceUrl} target='_blank' rel='noopener noreferrer'>{datasetSourceUrl}</a>
  </dataset-remote-info>
)
