import Select from './select'
import { shallow } from 'enzyme'

const sortOpts = [
  { value: 'foo', label: 'Foo', default: true },
  { value: 'bar', label: 'Bar' }
]

describe('Select', () => {
  test('sets the value and text of the sort option', () => {
    const subject = shallow(<Select options={sortOpts} />)

    expect(subject.find('option').at(0).text()).toEqual('Foo')
    expect(subject.find('option').at(1).props().value).toEqual('bar')
    expect(subject.find('.selector').props().defaultValue).toEqual('foo')
  })
})

describe('selecting an option', () => {
  let subject, selectChangeCallback

  beforeEach(() => {
    selectChangeCallback = jest.fn()
    subject = shallow(<Select options={sortOpts} selectChangeCallback={selectChangeCallback} />)
  })

  test('clicking a different option', () => {
    const secondOpt = subject.find('select')

    secondOpt.simulate('change', { target: { value: 'bar' } })

    expect(selectChangeCallback).toHaveBeenCalledWith('bar')
  })
})
