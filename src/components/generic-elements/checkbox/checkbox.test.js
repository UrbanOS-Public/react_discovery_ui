import { shallow } from 'enzyme'
import Checkbox from './checkbox'

describe('checkbox', () => {
  let subject
  let mockClickHandler
  let mockPreventDefault

  beforeEach(() => {
    mockClickHandler = jest.fn()
    mockPreventDefault = jest.fn()

    subject = shallow(
      <Checkbox
        clickHandler={mockClickHandler}
        text={"The label"}
        selected={true}
      />
    )
  })

  test('calls clickHandler on click', () => {
    subject.simulate('click')
    expect(mockClickHandler).toHaveBeenCalled()
  })

  test('calls clickHandler on spacebar', () => {
    subject.simulate('keyDown', {keyCode: 32, preventDefault: mockPreventDefault})
    expect(mockClickHandler).toHaveBeenCalled()
    expect(mockPreventDefault).toHaveBeenCalled()
  })

  test('does not call clickHandler on non-spacebar', () => {
    subject.simulate('keyDown', {keyCode: 348, preventDefault: mockPreventDefault})
    expect(mockClickHandler).not.toHaveBeenCalled()
    expect(mockPreventDefault).not.toHaveBeenCalled()
  })

  test('displays checkmark when selected', () => {
    expect(subject.exists('.selected')).toBeTruthy()
    expect(subject.exists('.checkmark')).toBeTruthy()
  })

  test('does not display checkmark when not selected', () => {
    subject = shallow(
        <Checkbox
      clickHandler={mockClickHandler}
      text={"The label"}
      selected={false}
        />
    )

    expect(subject.exists('.selected')).toBeFalsy()
    expect(subject.exists('.checkmark')).toBeFalsy()
  })
})
