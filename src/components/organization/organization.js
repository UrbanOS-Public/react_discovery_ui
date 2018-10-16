import './organization.scss'

export default ({ organization }) => (
  <dataset-organization>
    <div className='header'>Organization Info</div>
    <img className='logo' src={organization.image} />
    <div className='name'>{organization.name}</div>
    <div className='description'>{organization.description}</div>
  </dataset-organization>
)
