import Search from './search'
import { shallow } from 'enzyme'

const ENTER_KEY = 13

describe('search', () => {
  let searchCallback, subject

  beforeEach(() => {
    searchCallback = jest.fn()
    subject = shallow(<Search callback={searchCallback} defaultText='some search' />)
  })

  it('does not invoke callback when any key is pressed other than enter', () => {
    subject.find('.search-bar').simulate('keyup', { keyCode: 1 })

    expect(searchCallback).not.toHaveBeenCalled()
  })

  it('invoke callback when user initiates search by pressing enter button', () => {
    subject.find('.search-bar').simulate('keyup', { keyCode: ENTER_KEY })

    expect(searchCallback).toHaveBeenCalledWith('some search')
  })

  it('show the clear button when there is text in the search input', () => {
    expect(subject.find('.clear').hasClass('disabled')).toBeFalsy()
  })

  it('clear the text in the search box when the clear icon is clicked', () => {
    subject.find('.clear-icon').simulate('click')

    expect(subject.find('input').value).toBeFalsy()
  })

  it('hide the clear button when there is no text in the search input', () => {
    subject = shallow(<Search callback={jest.fn()} />)

    expect(subject.find('.clear').hasClass('disabled')).toBeTruthy()
  })
})
