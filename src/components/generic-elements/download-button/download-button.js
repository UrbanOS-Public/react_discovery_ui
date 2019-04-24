import './download-button.scss'

export default (props) => (
	<a className='download-button' href={props.url} target='_blank' rel='noopener noreferrer'>Download</a>
)