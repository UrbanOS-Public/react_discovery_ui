import { render } from 'enzyme'
import DatasetApiDoc from './dataset-api-doc'

describe('dataset api doc ', () => {
  const dataset = {
    id: 'coda_stuff',
    name: 'data_name',
    sourceFormat: 'csv',
    systemName: 'test__dataset',
    organization: { name: 'coda_name' },
    schema: [{ name: "id" }]
  }
  let subject

  beforeEach(() => {
    subject = render(<DatasetApiDoc dataset={dataset} />)
  })

  it('renders the example url with the dataset id', () => {
    expect(subject.find('.example-code').text()).toMatch('/api/v1/organization/coda_name/dataset/data_name/query?limit=200&_format=csv')
  })

  it('renders the freestyle query example body with the correct table and column name', () => {
    expect(subject.text()).toContain(`SELECT ${dataset.schema[0].name} FROM ${dataset.systemName}`)
  })

  describe('with gtfs format', () => {
    test('the example url maps _format to json', () => {
      const gtfsDataset = Object.assign({}, dataset, { sourceFormat: 'gtfs' })
      subject = render(<DatasetApiDoc dataset={gtfsDataset} />)

      expect(subject.find('.example-code').text()).toMatch('/api/v1/organization/coda_name/dataset/data_name/query?limit=200&_format=json')
    })
  })
})
