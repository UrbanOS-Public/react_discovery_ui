import FacetList from '../facet-list';
import _ from 'lodash'
import './facet-sidebar.scss'

const FacetSidebar = props => {
  return (
    <div className='facet-sidebar'>
      {_.map(props.availableFacets, (rawFacets, title) => {
        const facets = rawFacets.map((facet) => {
          const selected = _.get(props, `appliedFacets.${title}`, []).includes(facet.name)
          return Object.assign({}, facet, { selected })
        })
        return <FacetList facets={facets} title={title} clickHandler={(name) => props.clickHandler(title, name)} key={title} />
      })}
    </div>
  )
}

export default FacetSidebar