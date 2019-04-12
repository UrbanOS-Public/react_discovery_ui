import './organization.scss'
import { QueryStringBuilder } from '../../utils'

export default ({ organization }) => (
  <dataset-organization>
    <div className='header'>Organization Info</div>
    <a href={`/?${QueryStringBuilder.createFilterQueryString('organization', organization.title)}`}>
      <img className='logo' src={organization.image} />
    </a>
    <div className='name'>{organization.title}</div>
    <div className='description'>{organization.description}</div>
  </dataset-organization>
)
