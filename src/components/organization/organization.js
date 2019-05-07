import './organization.scss'
import { QueryStringBuilder } from '../../utils'

export default ({ organization }) => (
  <dataset-organization>
    <div className='header'>Organization Info</div>
    <a href={`/?${QueryStringBuilder.createFilterQueryString('organization', organization.title)}`}>
      <img className='logo' src={organization.image} />
    </a>
    <div className='name wrapped-text'>{organization.title}</div>
    <div className='description wrapped-text'>{organization.description}</div>
  </dataset-organization>
)
