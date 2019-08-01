import { render } from 'enzyme'
import Tooltip from ".";

describe('tooltip', () => {
  const text = 'LOL OMG'
  var subject

  beforeEach(() => {
    subject = render(<Tooltip text={text} />)
  })

  it('contains the given text', () => {
    expect(subject.text()).toContain(text)
  })

  it('contains the same text in a tooltip', () => {
    expect(subject.find('.tooltip-text').text()).toBe(text)
  })
})
