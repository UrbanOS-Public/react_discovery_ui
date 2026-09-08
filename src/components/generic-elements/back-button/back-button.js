import './back-button.scss'
import { GeneratedLink } from '../generated-link'

const BackButton = (props) => (
  <GeneratedLink className='back-button' {...props}>{props.children}</GeneratedLink>
)

export default BackButton;
