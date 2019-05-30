import { render } from 'enzyme'
import DatasetApiDoc from './dataset-api-doc'

describe('dataset api doc ', () => {
  let subject

  test('the example url should have the dataset id', () => {
    subject = render(<DatasetApiDoc dataset={{ id: 'coda_stuff', name: 'data_name', sourceFormat: 'csv', organization: { name: 'coda_name' } }} />)
    expect(subject.find('.example-code').text()).toMatch('/api/v1/organization/coda_name/dataset/data_name/query?limit=200&_format=csv')
  })

  test('the example url maps _format parameter if necessary', () => {
    subject = render(<DatasetApiDoc dataset={{ id: 'coda_stuff', name: 'data_name', sourceFormat: 'gtfs', organization: { name: 'coda_name' } }} />)
    expect(subject.find('.example-code').text()).toMatch('/api/v1/organization/coda_name/dataset/data_name/query?limit=200&_format=json')
  })
})
