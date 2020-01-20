import './download-button.scss'

export default (props) => (
  <a data-testid='download-button' className='download-button' href={props.url} target='_blank' rel='noopener noreferrer'>Download</a>
)
