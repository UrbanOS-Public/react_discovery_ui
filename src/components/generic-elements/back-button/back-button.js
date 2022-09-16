import './back-button.scss'
import { GeneratedLink } from '../generated-link'

export default (props) => (
  <GeneratedLink className='back-button' {...props}>{props.children}</GeneratedLink>
)
