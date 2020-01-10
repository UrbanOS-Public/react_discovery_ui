import './paginator.scss'
import _ from 'lodash'
import ArrowButton from '../arrow-button'

const DISPLAY_SIZE = 7
// Half the display width minus the first/last element and the elipsis
const MIDDLE_WIDTH = DISPLAY_SIZE / 2 - 2

export default ({ className, numberOfPages, currentPage, pageChangeCallback }) => {
  const options = calculateOptions(numberOfPages, currentPage)

  return (
    <paginator-element data-testid='paginator' class={className}>
      <ArrowButton className='pagination-box arrow' disabled={currentPage === 1} onClick={() => onLeftArrowClick(currentPage, pageChangeCallback)} innerClass='left-arrow' />
      {options.map((text, index) => createOption(index, text, currentPage, pageChangeCallback))}
      <ArrowButton className='pagination-box arrow' disabled={currentPage === numberOfPages} onClick={() => onRightArrowClick(currentPage, numberOfPages, pageChangeCallback)} innerClass='right-arrow' />
    </paginator-element>
  )
}

const createOption = (index, text, currentPage, pageChangeCallback) => {
  const isSelected = text === currentPage
  const isEllipsis = text === '...'
  const typeClass = isEllipsis ? 'ellipsis' : 'page-number'
  const selectedClass = isSelected ? 'selected' : ''

  const onClick = isSelected || isEllipsis ? () => { } : () => pageChangeCallback(text)

  return <button key={`pagination-option-${index}`} disabled={isSelected} className={`pagination-box option ${typeClass} ${selectedClass}`} onClick={onClick}>{text}</button>
}

const onLeftArrowClick = (currentPage, pageChangeCallback) => {
  if (currentPage > 1) {
    pageChangeCallback(currentPage - 1)
  }
}

const onRightArrowClick = (currentPage, numberOfPages, pageChangeCallback) => {
  if (currentPage < numberOfPages) {
    pageChangeCallback(currentPage + 1)
  }
}

const calculateOptions = (numberOfPages, currentPage) => {
  const needsTrailingElipsis = numberOfPages > DISPLAY_SIZE && currentPage < numberOfPages - (DISPLAY_SIZE / 2)
  const needsLeadingElipsis = numberOfPages > DISPLAY_SIZE && currentPage > 1 + (DISPLAY_SIZE / 2)

  let middleStart, middleEnd

  if (needsLeadingElipsis && needsTrailingElipsis) {
    middleStart = Math.ceil(currentPage - MIDDLE_WIDTH)
    middleEnd = Math.ceil(currentPage + MIDDLE_WIDTH)
  } else if (needsLeadingElipsis && !needsTrailingElipsis) {
    middleStart = Math.floor(numberOfPages - (DISPLAY_SIZE / 2))
    middleEnd = numberOfPages
  } else if (!needsLeadingElipsis && needsTrailingElipsis) {
    middleStart = 2
    middleEnd = DISPLAY_SIZE - 1
  } else {
    middleStart = 2
    middleEnd = numberOfPages
  }

  return _(
    [1,
      needsLeadingElipsis ? '...' : null,
      numberOfPages > 2 ? _.range(middleStart, middleEnd) : null,
      needsTrailingElipsis ? '...' : null,
      numberOfPages > 1 ? numberOfPages : null])
    .flatten()
    .compact()
    .value()
}
