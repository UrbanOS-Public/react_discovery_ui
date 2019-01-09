import { shallow } from 'enzyme'
import FacetList from './facet-list'

describe('facet list view', () => {
  let subject, mockClickHandler

  let availableFacets = {
    organization: [
      {name: 'neat COTA', count: 1},
      {name: 'Apple', count: 1},
      {name: 'Massive Data', count: 5},
      {name: 'Interesting Things', count: 3},
      {name: 'Conduent', count: 2}
    ],
    tags:[
      {name: 'foo', count: 5},
      {name: 'dilbert', count: 10},
      {name: 'jimmy', count: 1},
      {name: 'bar', count: 2},
      {name: 'Zoo', count: 2}
    ]
  }

  beforeEach(() => {
    mockClickHandler = jest.fn()
    subject = shallow(
      <FacetList
        availableFacets={availableFacets}
        appliedFacets={{}}
        clickHandler={mockClickHandler}
      />
    )
  })

  it('calls its click handler when a facet is clicked on', () => {
    subject.find('.section .facet').first().simulate('click')
    expect(mockClickHandler).toBeCalledWith('organization', 'Massive Data')
  })

  it('has a selected class if youve clicked on it', () => {
    expect(subject.find('.neat-COTA').hasClass('selected')).toEqual(false)

    subject.setProps({
      appliedFacets: {
        organization: ['neat COTA', 'Conduent']
      }
    })

    expect(subject.find('.neat-COTA').hasClass('selected')).toEqual(true)
  })

  it('doesnt freak out if applied facets is empty', () => {
    expect(subject.find('.neat-COTA').hasClass('selected')).toEqual(false)

    subject.setProps({
      appliedFacets: undefined
    })

    expect(subject.find('.section-header').length).toEqual(2)
  })

  it('pleasantly pluralizes', () => {
    expect(subject.find('.section-header').at(0).text()).toEqual('organizations')
    expect(subject.find('.section-header').at(1).text()).toEqual('tags')
  })

  it('sorts the organizations in descending order by count and name', () => {
    const organizationFacets = subject.find('.organization').find('.facet').map( item => item.text())

    expect(organizationFacets).toEqual([
      'Massive Data (5)',
      'Interesting Things (3)',
      'Conduent (2)',
      'Apple (1)',
      'neat COTA (1)'
    ])
  })

  it('sorts the tags in descending order by count and name', () => {
    const tagFacets = subject.find('.tags').find('.facet').map( item => item.text())

    expect(tagFacets).toEqual([
      'dilbert (10)',
      'foo (5)',
      'bar (2)',
      'Zoo (2)',
      'jimmy (1)'
    ])

  })
})
