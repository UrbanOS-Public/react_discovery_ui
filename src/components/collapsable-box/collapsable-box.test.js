import { shallow } from 'enzyme'
import CollapsableBox from './collapsable-box'

describe('CollapsableBox ', () => {
  test('desktop default to expanded', () => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true
      }))
    })
    const subject = shallow(
      <CollapsableBox headerHtml='<div />'>
        <div />
      </CollapsableBox>
    )
    expect(subject.state('expanded')).toEqual(true)
  })

  test('mobile/table default to collapsed', () => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false
      }))
    })
    const subject = shallow(
      <CollapsableBox headerHtml='<div />'>
        <div />
      </CollapsableBox>
    )
    expect(subject.state('expanded')).toEqual(undefined)
  })

  test('clicking the header changes the expanded state on mobile/tablet', () => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false
      }))
    })
    const subject = shallow(
      <CollapsableBox headerHtml='<div />' expanded={false}>
        <div />
      </CollapsableBox>
    )
    subject.find('.header-container').simulate('click')
    expect(subject.state('expanded')).toEqual(true)
  })

  test('clicking the header changes the expanded state on Desktop', () => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true
      }))
    })
    const subject = shallow(
      <CollapsableBox headerHtml='<div />' expanded={false}>
        <div />
      </CollapsableBox>
    )
    subject.find('.header-container').simulate('click')
    expect(subject.state('expanded')).toEqual(false)
  })

  test('clicking the header changes the expanded state on expanded', () => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: undefined
      }))
    })
    const subject = shallow(
      <CollapsableBox headerHtml='<div />' expanded>
        <div />
      </CollapsableBox>
    )
    subject.find('.header-container').simulate('click')
    expect(subject.state('expanded')).toEqual(false)
  })
})
