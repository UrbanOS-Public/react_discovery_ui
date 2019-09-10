import { shallow } from 'enzyme'
import DataCard from './data-card'
import { Link } from 'react-router-dom'
import SanitizedHTML from 'react-sanitized-html'
import ReactImageFallback from 'react-image-fallback';

let subject
const dataset = {
  id: 'c21e1562-c44b-4d65-b8ec-cac3dcbb133b',
  name: 'someName',
  title: 'someTitle',
  sourceType: 'ingest',
  organization_name: 'org_name',
  organization_title: 'Organization Title',
  organization_image_url: 'logo.png',
  description: 'somedescription',
  fileTypes: ['foo', 'bar'],
  modified: '2018-06-21',
  dateString: 'Jul 22, 2018'
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
    expect(subject.find('.last-modified').text()).toContain('Jul 22, 2018')
    expect(subject.find(Link).at(1).props().to).toEqual(
      `/dataset/${dataset.organization_name}/${dataset.name}`
    )
  })
})

describe('data card element with logo', () => {
  beforeEach(() => {
    subject = shallow(<DataCard dataset={dataset} />)
  })

  test('card to render logo with correct url and alt text', () => {
    expect(subject.find(ReactImageFallback).prop('alt')).toEqual(`The logo for Organization Title`)
    expect(subject.find(ReactImageFallback).prop('src')).toEqual(dataset.organization_image_url)
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
    expect(subject.find('.last-modified').text()).toContain('Jul 22, 2018')
    expect(subject.find(Link).at(1).props().to).toEqual(
      `/dataset/${dataset.organization_name}/${dataset.name}`
    )
  })
})
