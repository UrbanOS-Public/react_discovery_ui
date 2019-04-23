import FacetList from './facet-list'
import { shallow } from 'enzyme'

describe('facet list', () => {
  let subject, mockClickHandler

  let facets = [
        { name: 'neat COTA', count: 1, selected: true },
        { name: 'Apple', count: 1, selected: false  },
        { name: 'Massive Data', count: 5, selected: false },
        { name: 'Interesting Things', count: 3, selected: true },
        { name: 'Conduent', count: 2, selected: false }
      ]

  beforeEach(() => {
    mockClickHandler = jest.fn()
    subject = shallow(
      <FacetList
        facets={facets}
        clickHandler={mockClickHandler}
        title='Organization'
      />
    )
  })

  it('renders the given facets', () => {
    expect(subject.find('.facet')).toHaveLength(5)
  })

  it('should call the click handler when a facet is clicked', () => {
    subject.find('.facet').first().simulate('click')
    expect(mockClickHandler).toBeCalledWith('Massive Data')
  })

  it('sorts the facets in descending order by count and name', () => {
    const facets = subject.find('.facet').map(item => item.text())

    expect(facets).toEqual([
      'Massive Data (5)',
      'Interesting Things (3)',
      'Conduent (2)',
      'Apple (1)',
      'neat COTA (1)'
    ])
  })

  it('gives facets the selected class if the facet is selected', () => {
    expect(subject.find('.selected')).toHaveLength(2)
  })

  it('renders the title of the facets', () => {
    expect(subject.find('.section-header').text()).toEqual('Organizations')
  })
})