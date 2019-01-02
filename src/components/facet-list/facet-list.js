import _ from 'lodash'
import pluralize from 'pluralize'
import './facet-list.scss'

const FacetList = props => {
  const SPACEBAR = 32

  const createFacet = (facetValues, facetName) => {
    const appliedFacets = props.appliedFacets ? props.appliedFacets[facetName] || [] : [] //thank the linter

    const createFacetValues = (facetValueCount, facetValue) => {
      const keyHandler = e => {
        if (e.keyCode === SPACEBAR) {
          props.clickHandler(facetName, facetValue)
          e.preventDefault()
        }
      }

      const isSelected = appliedFacets.includes(facetValue)
        ? 'selected'
        : ''

      return (
        props.availableFacets &&
        <div className='facet' role='button' tabIndex='0' key={facetValue}
          onClick={() => props.clickHandler(facetName, facetValue)}
          onKeyDown={(e) => { keyHandler(e) }}
        >

          <span className={`facet-indicator ${facetValue.replace(' ', '-')} ${isSelected}`}>
            {isSelected && <div className='cool-check-mark' />}
          </span>
          <span className='facet-label'>
            {facetValue || 'Unorganized'} ({facetValueCount})
          </span>

        </div>
      )
    }

    return (
      <div key={facetName} className='section'>
        <div className='section-header'>{pluralize.plural(facetName)}</div>
        {_.map(facetValues, createFacetValues)}
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
