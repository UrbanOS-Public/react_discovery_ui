import _ from 'lodash'
import Checkbox from '../generic-elements/checkbox'
import './facet-list.scss'

const FacetList = props => {
  const getText = (name, count) => {
    return `${name || 'Unorganized'} (${count})`
  }

  const simplePluralize = word => {
    return word.endsWith('s') ? word : `${word}s`
  }

  const showMore = props.facets.length > props.limit

  return (
    <div data-testid={`facet-list-${props.title}`} className='section facet-list'>
      <div className='section-header'>
        {simplePluralize(props.title)}
      </div>
      {
        _.chain(props.facets)
          .orderBy(['selected', 'count', facet => facet.name.toLowerCase()], ['desc', 'desc', 'asc'])
          .slice(0, props.limit)
          .map(({ name, count, selected }) => (
            <Checkbox
              clickHandler={() => props.clickHandler(name)}
              text={getText(name, count)}
              selected={selected}
              key={name}
            />
          ))
          .value()
      }
      {showMore && <a className='show-more' onClick={() => props.showMoreHandler(props.title, props.facets)}>Show more</a>}
    </div>
  )
}

export default FacetList
