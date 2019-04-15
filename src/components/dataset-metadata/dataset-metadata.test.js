import { shallow } from 'enzyme'
import DatasetMetadata from './dataset-metadata'

describe('additional info element', () => {
  test('card to render text based on props', () => {
    let subject = shallow(<DatasetMetadata dataset={{ spatial: 'Ohio' }} />)
    let table = subject.find('ReactTable')
    expect(table.prop('data')[4]).toEqual({ Field: 'Spatial', Value: 'Ohio' })
  })

  test('card renders mailto link correctly', () => {
    let subject = shallow(<DatasetMetadata dataset={{ contactName: 'John', contactEmail: 'john@smith.com' }} />)
    let actual = JSON.stringify(subject.find('ReactTable').prop('data')[0])
    let expected = JSON.stringify({ Field: 'Maintainer', Value: <a href='mailto:john@smith.com'>John</a> })
    expect(actual).toEqual(expected)
  })

  test('referenceUrls renders correctly', () => {
    let subject = shallow(<DatasetMetadata dataset={{ referenceUrls: ['https://www.google.com', 'https://www.facebook.com'] }} />)
    let actual = JSON.stringify(subject.find('ReactTable').prop('data')[14])
    let expected = JSON.stringify({ Field: 'Related Documents', Value: [<div><a href='https://www.google.com' target='_blank'>https://www.google.com</a></div>, <div><a href='https://www.facebook.com' target='_blank'>https://www.facebook.com</a></div>] })
    expect(actual).toEqual(expected)
  })
})
