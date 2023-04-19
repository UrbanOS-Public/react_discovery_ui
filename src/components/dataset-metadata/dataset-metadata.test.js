import { shallow } from 'enzyme'
import DatasetMetadata from './dataset-metadata'

describe('additional info element', () => {
  test('card to render text based on props', () => {
    const subject = shallow(<DatasetMetadata dataset={{ spatial: 'Ohio' }} />)
    const table = subject.find('ReactTable')
    expect(table.prop('data')[4]).toEqual({ Field: 'Spatial', Value: 'Ohio' })
  })

  test('card renders mailto link correctly', () => {
    const subject = shallow(<DatasetMetadata dataset={{ contactName: 'John', contactEmail: 'john@smith.com' }} />)
    const actual = JSON.stringify(subject.find('ReactTable').prop('data')[0])
    const expected = JSON.stringify({ Field: 'Maintainer', Value: <a href='mailto:john@smith.com'>John</a> })
    expect(actual).toEqual(expected)
  })

  test('referenceUrls renders correctly', () => {
    const subject = shallow(<DatasetMetadata dataset={{ referenceUrls: ['https://www.google.com', 'https://www.facebook.com'] }} />)
    const actual = JSON.stringify(subject.find('ReactTable').prop('data')[13])
    const expected = JSON.stringify({ Field: 'Related Documents', Value: [<div><a href='https://www.google.com' target='_blank'>https://www.google.com</a></div>, <div><a href='https://www.facebook.com' target='_blank'>https://www.facebook.com</a></div>] })
    expect(actual).toEqual(expected)
  })
})
