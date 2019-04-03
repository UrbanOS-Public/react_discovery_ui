import './organization.scss'
import { QueryStringBuilder } from '../../utils'

export default ({ organization }) => (
  <dataset-organization>
    <div className='header'>Organization Info</div>
    <a href={`/?${QueryStringBuilder.createFilterQueryString('organization', organization.name)}`}>
      <img className='logo' src={organization.image} />
    </a>
    <div className='name'>{organization.name}</div>
    <div className='description'>{organization.description}</div>
  </dataset-organization>
)
