import { shallow } from 'enzyme'
import DataCard from './data-card'
import { Link } from 'react-router-dom'

describe('data card element', () => {
  let subject
  const dataset = {
    id: 'c21e1562-c44b-4d65-b8ec-cac3dcbb133b',
    title: 'someTitle',
    description: 'somedescription',
    fileTypes: ['foo', 'bar'],
    modifiedTime: '2018-06-21'
  }

  beforeEach(() => {
    subject = shallow(<DataCard dataset={dataset} />)
  })

  test('card to render text based on props', () => {
    expect(subject.find('.description').text()).toEqual(dataset.description)
    expect(subject.find('.file-type').length).toEqual(dataset.fileTypes.length)
    expect(subject.find('.last-modified').text()).toContain('Jun 21, 2018')
    expect(subject.find(Link).props().to).toEqual(`/dataset/${dataset.id}`)
  })
})
