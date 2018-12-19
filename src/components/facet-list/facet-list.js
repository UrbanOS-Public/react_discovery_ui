import _ from 'lodash'
import './facet-list.scss'

const FacetList = props => {
  const createFacet = (facetValues, facetName) => {
    const appliedFacets = props.appliedFacets && props.appliedFacets[facetName] || []

    const createFacetValues = (facetValueCount, facetValue) => {

      const isSelected = appliedFacets.includes(facetValue)
        ? "selected"
        : ""

      return (
        props.availableFacets && <div
          className='facet'
          role="button"
          tabIndex="0"
          onClick={() => props.clickHandler(facetName, facetValue)}
          onKeyDown={(e) => {
            if (e.keyCode == 32) {
              props.clickHandler(facetName, facetValue)
              e.preventDefault()
            }
          }}
          key={facetValue}>
            <span className={`facet-indicator ${facetValue.replace(' ', '-')} ${isSelected}`}>
            {isSelected && <div className="cool-check-mark" />}
          </span>
          <span className="facet-label">{facetValue || "Unorganized"} ({facetValueCount})</span>
        </div>
      )
    }

    return (
      <div key={facetName} className="section">
        <div className="section-header">{facetName}s</div>
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
