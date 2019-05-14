import { shallow } from 'enzyme'
import DataCard from './data-card'
import { Link } from 'react-router-dom'
import SanitizedHTML from 'react-sanitized-html'

let subject
const dataset = {
  id: 'c21e1562-c44b-4d65-b8ec-cac3dcbb133b',
  name: 'someName',
  title: 'someTitle',
  organization_name: 'org_name',
  description: 'somedescription',
  fileTypes: ['foo', 'bar'],
  modifiedTime: '2018-06-21'
}

describe('data card element', () => {
  beforeEach(() => {
    subject = shallow(<DataCard dataset={dataset} />)
  })

  test('card to render text based on props', () => {
    expect(
      subject
        .find(SanitizedHTML)
        .dive()
        .render()
        .text()
    ).toEqual(dataset.description)
    expect(subject.find('.file-type').length).toEqual(dataset.fileTypes.length)
    expect(subject.find('.last-modified').text()).toContain('Jun 21, 2018')
    expect(subject.find(Link).props().to).toEqual(
      `/dataset/${dataset.organization_name}/${dataset.name}`
    )
  })
})

describe('data card element with html description', () => {
  beforeEach(() => {
    const datasetWithHtmlDescription = Object.assign({}, dataset, {
      description: '<table></table>somedescription'
    })

    subject = shallow(<DataCard dataset={datasetWithHtmlDescription} />)
  })

  test('tags not in the whitelist are removed', () => {
    expect(
      subject
        .find(SanitizedHTML)
        .dive()
        .render()
        .text()
    ).toEqual(dataset.description)
    expect(subject.find('.file-type').length).toEqual(dataset.fileTypes.length)
    expect(subject.find('.last-modified').text()).toContain('Jun 21, 2018')
    expect(subject.find(Link).props().to).toEqual(
      `/dataset/${dataset.organization_name}/${dataset.name}`
    )
  })
})
