import { shallow } from 'enzyme'
import CollapsableBox from './collapsable-box'

describe('CollapsableBox ', () => {
  test('desktop default to expanded', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
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
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
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
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
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
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
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
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
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
