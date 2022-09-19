import { shallow } from 'enzyme'

import ShareLink from '.'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'

describe('share-link', () => {
  const linkUrl = '/path/to/thing'
  const windowOrigin = 'http://origin'
  let subject

  beforeEach(() => {
    setOrigin(windowOrigin)
    subject = shallow(<ShareLink linkUrl={linkUrl} />)
  })

  it('has a link to a relative path', () => {
    expect(subject.find(Link).props().to).toBe(linkUrl)
  })

  it('allows copying an absolute link to the clipboard', () => {
    expect(subject.find(CopyToClipboard).props().text).toBe(`${windowOrigin}${linkUrl}`)
  })
})

const setOrigin = origin => {
  Object.defineProperty(window, 'location', { value: { origin } })
}
