import { shallow } from 'enzyme'
import DatasetRemoteInfo from './dataset-remote-info'

describe('dataset remote info', () => {
  describe('ui', () => {
    let subject
    const sourceUrl = 'http://example.com/stuff.json'

    beforeEach(() => {
      subject = shallow(<DatasetRemoteInfo datasetSourceUrl={sourceUrl} />)
    })

    test('should render a link to the source url', () => {
      expect(subject.exists(`a[href="${sourceUrl}"]`)).toBe(true)
    })
  })
})
