import { shallow } from 'enzyme'
import FacetList from './facet-list'

describe('facet list view', () => {
  let subject, mockClickHandler

  let availableFacets = {
    organization: {
      "neat COTA": 1,
      Conduent: 2
    }
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
    expect(mockClickHandler).toBeCalledWith('organization', 'neat COTA')
  })

  it('has a selected class if youve clicked on it', () => {
    expect(subject.find('.neat-COTA').hasClass('selected')).toEqual(false)

    subject.setProps({
      appliedFacets: {
        organization: ['neat COTA', 'Conduent']
      },
    })

    expect(subject.find('.neat-COTA').hasClass('selected')).toEqual(true)
  })
})

