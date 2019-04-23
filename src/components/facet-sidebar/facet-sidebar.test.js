import FacetSidebar from './facet-sidebar'
import { shallow } from 'enzyme'

describe('facet sidebar', () => {
  let subject, mockClickHandler
  let availableFacets = {
    organization: [
      { name: 'neat COTA', count: 1 },
      { name: 'Apple', count: 1 },
      { name: 'Massive Data', count: 5 },
      { name: 'Interesting Things', count: 3 },
      { name: 'Conduent', count: 2 }
    ],
    tags: [
      { name: 'foo', count: 5 },
      { name: 'dilbert', count: 10 },
      { name: 'jimmy', count: 1 },
      { name: 'bar', count: 2 },
      { name: 'Zoo', count: 2 }
    ]
  }
  let appliedFacets = {
    tags: [
      'foo', 'dilbert'
    ],
    organization: [
      'Apple', 'Massive Data', 'Conduent'
    ]
  }

  beforeEach(() => {
    mockClickHandler = jest.fn()
    subject = shallow(
      <FacetSidebar
        availableFacets={availableFacets}
        appliedFacets={appliedFacets}
        clickHandler={mockClickHandler}
      />
    )
  })

  it('has two facet lists when given two types of facets', () => {
    expect(subject.children()).toHaveLength(2)
  })

  it('sets the selected facets based on the applied facets', () => {
    const expectedSelectedTags = [
      { name: 'foo', count: 5, selected: true },
      { name: 'dilbert', count: 10, selected: true },
      { name: 'jimmy', count: 1, selected: false },
      { name: 'bar', count: 2, selected: false },
      { name: 'Zoo', count: 2, selected: false }
    ]

    const expectedSelectedOrgs = [
      { name: 'neat COTA', count: 1, selected: false },
      { name: 'Apple', count: 1, selected: true },
      { name: 'Massive Data', count: 5, selected: true },
      { name: 'Interesting Things', count: 3, selected: false },
      { name: 'Conduent', count: 2, selected: true }
    ]

    expect(subject.children().last().prop('facets')).toEqual(expectedSelectedTags)
    expect(subject.children().first().prop('facets')).toEqual(expectedSelectedOrgs)
  })
})