import './organization.scss'
import { QueryStringBuilder } from '../../utils'

export default ({ organization }) => (
  <dataset-organization>
    <div className='organization-header'>Organization Info</div>
    <a href={`/?${QueryStringBuilder.createFilterQueryString('organization', organization.title)}`}>
      <img data-testid='organization-logo' className='logo' src={organization.image} />
    </a>
    <div data-testid='organization-title' className='name wrapped-text'>{organization.title}</div>
    <div data-testid='organization-description' className='description wrapped-text'>{organization.description}</div>
  </dataset-organization>
)
