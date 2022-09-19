import FacetSidebar from './facet-sidebar'
import { shallow } from 'enzyme'

describe('facet sidebar', () => {
  let subject, mockClickHandler
  const availableFacets = {
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
  const appliedFacets = {
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

  it('has two facet lists and dialog when given two types of facets', () => {
    expect(subject.children()).toHaveLength(3)
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

    expect(subject.childAt(0).prop('facets')).toEqual(expectedSelectedOrgs)
    expect(subject.childAt(1).prop('facets')).toEqual(expectedSelectedTags)
  })

  it('sets the dialog state variables when showMoreHandler is called', () => {
    const facets = [
      { name: 'foo', count: 5, selected: true },
      { name: 'dilbert', count: 10, selected: true },
      { name: 'jimmy', count: 1, selected: false }
    ]

    subject.childAt(0).prop('showMoreHandler')('title', facets)
    expect(subject.state('showDialog')).toBeTruthy()
    expect(subject.state('dialogFacets')).toEqual(facets)
    expect(subject.state('dialogTitle')).toEqual('title')
  })

  it('sets show dialog to false when the clickHander is invoked', () => {
    subject.childAt(0).prop('clickHandler')('name')

    expect(subject.state('showDialog')).toEqual(false)
    expect(mockClickHandler).toBeCalledWith('organization', 'name')
  })

  it('sets showDialog to false when dialog is closed', () => {
    subject.setState({ showDialog: true })
    subject.childAt(2).prop('onClose')()

    expect(subject.state('showDialog')).toEqual(false)
  })
})
