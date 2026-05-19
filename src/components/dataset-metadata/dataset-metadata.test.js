import { mount } from 'enzyme'
import DatasetMetadata from './dataset-metadata'

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: true
    }))
  })
})

describe('additional info element', () => {
  test('card to render text based on props', () => {
    const subject = mount(<DatasetMetadata dataset={{ spatial: 'Ohio' }} />)
    const cells = subject.find('td')
    const spatialValue = cells.filterWhere(td => td.text() === 'Ohio')
    expect(spatialValue.length).toBe(1)
  })

  test('card renders mailto link correctly', () => {
    const subject = mount(<DatasetMetadata dataset={{ contactName: 'John', contactEmail: 'john@smith.com' }} />)
    const link = subject.find('a[href="mailto:john@smith.com"]')
    expect(link.length).toBe(1)
    expect(link.text()).toBe('John')
  })

  test('referenceUrls renders correctly', () => {
    const subject = mount(<DatasetMetadata dataset={{ referenceUrls: ['https://www.google.com', 'https://www.facebook.com'] }} />)
    const googleLink = subject.find('a[href="https://www.google.com"]')
    const facebookLink = subject.find('a[href="https://www.facebook.com"]')
    expect(googleLink.length).toBe(1)
    expect(facebookLink.length).toBe(1)
  })
})
