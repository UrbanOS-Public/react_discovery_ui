import FacetList from './facet-list'
import Checkbox from '../generic-elements/checkbox'
import { shallow, mount } from 'enzyme'

describe('facet list', () => {
  let subject, mockClickHandler, mockShowMoreHandler

  const facets = [
    { name: 'neat COTA', count: 1, selected: true },
    { name: 'Apple', count: 1, selected: false },
    { name: 'Massive Data', count: 5, selected: false },
    { name: 'Interesting Things', count: 3, selected: true },
    { name: 'Conduent', count: 2, selected: false },
    { name: 'Weyland-Yutani', count: 1, selected: false }
  ]

  beforeEach(() => {
    mockClickHandler = jest.fn()
    mockShowMoreHandler = jest.fn()
    subject = shallow(
      <FacetList
        facets={facets}
        clickHandler={mockClickHandler}
        title='Organization'
        limit={5}
        showMoreHandler={mockShowMoreHandler}
      />
    )
  })

  it('renders the given facets', () => {
    expect(subject.find(Checkbox)).toHaveLength(5)
  })

  it('sorts the facets in descending order by selected, count and name and limits the number displayed', () => {
    const facets = subject.find(Checkbox).map(item => item.props().text)

    expect(facets).toEqual([
      'Interesting Things (3)',
      'neat COTA (1)',
      'Massive Data (5)',
      'Conduent (2)',
      'Apple (1)'
    ])
  })

  it('gives facets the selected class if the facet is selected', () => {
    expect(subject.find(Checkbox).filterWhere(n => n.props().selected)).toHaveLength(2)
  })

  describe('show more', () => {
    it('button appears when there are more facets than limit', () => {
      expect(subject.find('.show-more')).toHaveLength(1)
    })

    it('button does not appear when there are fewer facets than limit', () => {
      subject = shallow(
        <FacetList
          facets={facets}
          clickHandler={mockClickHandler}
          title='Organization'
          limit={6}
          showMoreHandler={mockShowMoreHandler}
        />)

      expect(subject.find('.show-more')).toHaveLength(0)
    })

    it('should call the showMoreHandler when the show more button is clicked', () => {
      subject.find('.show-more').simulate('click')

      expect(mockShowMoreHandler).toHaveBeenCalledWith('Organization', facets)
    })
  })

  describe('title', () => {
    it('should add s to title when it does not exist', () => {
      expect(subject.find('.section-header').text()).toEqual('Organizations')
    })

    it('should not add s to title when it does exist', () => {
      subject = shallow(
        <FacetList
          facets={facets}
          clickHandler={mockClickHandler}
          title='Organizations'
          limit={6}
          showMoreHandler={mockShowMoreHandler}
        />)

      expect(subject.find('.section-header').text()).toEqual('Organizations')
    })
  })
})
