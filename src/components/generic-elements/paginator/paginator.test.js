import Paginator from './paginator'
import ArrowButton from '../arrow-button'
import { shallow } from 'enzyme'

describe('Paginator', () => {
  test('sets the text of the option to 1 when number of pages is 1', () => {
    const subject = shallow(<Paginator currentPage={1} numberOfPages={1} />)

    expect(subject.find('.option').text()).toEqual('1')
  })

  test('sets the text of the options correctly when number of pages is 7', () => {
    const expected = ['1', '2', '3', '4', '5', '6', '7']

    const subject = shallow(<Paginator currentPage={1} numberOfPages={7} />)

    expect(subject.find('.option').map(it => it.text())).toEqual(expected)
  })

  test('sets the text of the options correctly when current page is 4 with more 8 total pages', () => {
    const expected = ['1', '2', '3', '4', '5', '...', '8']

    const subject = shallow(<Paginator currentPage={4} numberOfPages={8} />)

    expect(subject.find('.option').map(it => it.text())).toEqual(expected)
  })

  test('sets the text of the options correctly when current page is 1 with more 8 total pages', () => {
    const expected = ['1', '2', '3', '4', '5', '...', '8']

    const subject = shallow(<Paginator currentPage={1} numberOfPages={8} />)

    expect(subject.find('.option').map(it => it.text())).toEqual(expected)
  })

  test('sets the text of the options correctly when current page is 11 with 14 total pages', () => {
    const expected = ['1', '...', '10', '11', '12', '13', '14']

    const subject = shallow(<Paginator currentPage={11} numberOfPages={14} />)

    expect(subject.find('.option').map(it => it.text())).toEqual(expected)
  })

  test('sets the text of the options correctly when current page is 14 with 14 total pages', () => {
    const expected = ['1', '...', '10', '11', '12', '13', '14']

    const subject = shallow(<Paginator currentPage={14} numberOfPages={14} />)

    expect(subject.find('.option').map(it => it.text())).toEqual(expected)
  })

  test('sets the text of the options correctly when current page is 6 with 20 total pages', () => {
    const expected = ['1', '...', '5', '6', '7', '...', '20']

    const subject = shallow(<Paginator currentPage={6} numberOfPages={20} />)

    expect(subject.find('.option').map(it => it.text())).toEqual(expected)
  })

  test('sets the text of the options correctly when current page is 1 with 3 total pages', () => {
    const expected = ['1', '2', '3']

    const subject = shallow(<Paginator currentPage={1} numberOfPages={3} />)

    expect(subject.find('.option').map(it => it.text())).toEqual(expected)
  })

  describe('clicking behavior', () => {
    let subject, pageChangeCallback

    beforeEach(() => {
      pageChangeCallback = jest.fn()
      subject = shallow(<Paginator currentPage={1} numberOfPages={15} pageChangeCallback={pageChangeCallback} />)
    })

    test('clicking a page number invokes the pageChangeCallback with the page number clicked', () => {
      const thirdPage = subject.find('.page-number').at(2)

      thirdPage.simulate('click')

      expect(pageChangeCallback).toHaveBeenCalledWith(3)
    })

    test('clicking the existing page number does nothing', () => {
      const selectedPage = subject.find('.selected').at(0)

      selectedPage.simulate('click')

      expect(pageChangeCallback).not.toHaveBeenCalled()
    })

    test('clicking an ellipsis does nothing', () => {
      const ellipsisElement = subject.find('.ellipsis').at(0)

      ellipsisElement.simulate('click')

      expect(pageChangeCallback).not.toHaveBeenCalled()
    })
  })

  describe('arrow functionality', () => {
    let pageChangeCallback

    beforeEach(() => {
      pageChangeCallback = jest.fn()
    })

    test('clicking the left arrow when on the first page does nothing', () => {
      const subject = shallow(<Paginator currentPage={1} numberOfPages={15} pageChangeCallback={pageChangeCallback} />)

      subject.find(ArrowButton).at(0).props().onClick()

      expect(pageChangeCallback).not.toHaveBeenCalled()
    })

    test('clicking the right arrow when on the last page does nothing', () => {
      const subject = shallow(<Paginator currentPage={15} numberOfPages={15} pageChangeCallback={pageChangeCallback} />)

      subject.find(ArrowButton).at(1).props().onClick()

      expect(pageChangeCallback).not.toHaveBeenCalled()
    })

    test('clicking the left arrow invokes the pageChangeCallback with the previous page', () => {
      const subject = shallow(<Paginator currentPage={4} numberOfPages={15} pageChangeCallback={pageChangeCallback} />)

      subject.find(ArrowButton).at(0).props().onClick()

      expect(pageChangeCallback).toHaveBeenCalledWith(3)
    })

    test('clicking the right arrow invokes the pageChangeCallback with the next page', () => {
      const subject = shallow(<Paginator currentPage={4} numberOfPages={15} pageChangeCallback={pageChangeCallback} />)

      subject.find(ArrowButton).at(1).props().onClick()

      expect(pageChangeCallback).toHaveBeenCalledWith(5)
    })
  })
})
