import _ from 'lodash'
import './facet-list.scss'

const simplePluralize = word => {
  return word.endsWith('s') ? word : `${word}s`
}

const FacetList = props => {
  const SPACEBAR = 32

  const createFacet = (facetValues, facetType) => {
    const appliedFacets = _.get(props, `appliedFacets.${facetType}`, [])

    const createFacetValues = (facet) => {
      const count = facet["count"]
      const name = facet["name"]
      const keyHandler = e => {
        if (e.keyCode === SPACEBAR) {
          props.clickHandler(facetType, name)
          e.preventDefault()
        }
      }

      const isSelected = appliedFacets.includes(name)
        ? 'selected'
        : ''

      return (
        props.availableFacets &&
        <div className='facet' role='button' tabIndex='0' key={name}
          onClick={() => props.clickHandler(facetType, name)}
          onKeyDown={(e) => { keyHandler(e) }}
        >

          <span className={`facet-indicator ${name.replace(' ', '-')} ${isSelected}`}>
            {isSelected && <div className='cool-check-mark' />}
          </span>
          <span className='facet-label'>
            {name || 'Unorganized'} ({count})
          </span>

        </div>
      )
    }

    return (
      <div key={facetType} className={`section ${facetType}`}>
        <div className='section-header'>{simplePluralize(facetType)}</div>
        {_.map(_.orderBy(facetValues, ['count', facet => facet.name.toLowerCase()], ['desc', 'asc']), createFacetValues)}
      </div>
    )
  }

  return (
    <facet-list>
      {_.map(props.availableFacets, createFacet)}
    </facet-list>
  )
}

export default FacetList
