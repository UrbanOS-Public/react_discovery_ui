import _ from 'lodash'
import './facet-list.scss'

const FacetList = props => {
  const keyHandler = (e, name) => {
    const SPACEBAR = 32
    if (e.keyCode === SPACEBAR) {
      props.clickHandler(name)
      e.preventDefault()
    }
  }

  const showMore = props.facets.length > props.limit

  return (
    <div className='section facet-list'>
      <div className='section-header'>
        {simplePluralize(props.title)}
      </div>
      {
        _.chain(props.facets)
          .orderBy(['selected', 'count', facet => facet.name.toLowerCase()], ['desc', 'desc', 'asc'])
          .slice(0, props.limit)
          .map(({ name, count, selected }) => (
            <div className='facet ' role='button' tabIndex='0' key={name}
              onClick={() => props.clickHandler(name)}
              onKeyDown={(e) => { keyHandler(e, name) }}>
              <span className={`facet-indicator ${selected ? 'selected' : ''}`}>
                {selected && <div className='cool-check-mark' />}
              </span>
              <span className='facet-label wrapped-text'>
                {name || 'Unorganized'} ({count})
              </span>
            </div>
          ))
          .value()
      }
      {showMore && <a className="show-more" onClick={() => props.showMoreHandler(props.title, props.facets)}>Show more</a>}
    </div>
  )
}

const simplePluralize = word => {
  return word.endsWith('s') ? word : `${word}s`
}

export default FacetList
