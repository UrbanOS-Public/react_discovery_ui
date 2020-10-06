import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import CallToActionButton from '../../components/generic-elements/call-to-action-button'
import DatasetDetailView from '.'

describe('dataset view', () => {
  let storeMocker, state

  beforeEach(() => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true
      })),
    });
    storeMocker = configureStore([])
    state = {
      datasetReducer: {
        dataset: {
          id: '123',
          sourceType: 'ingest',
          fileTypes: ['CSV'],
          sourceFormat: 'text/csv',
          organization: {},
          schema: [{ name: 'id', type: 'integer', description: 'id description' }]
        }

      },
      presentation: {dataset_preview: {}}
    }
  })

  it('has a download button with the correct url', () => {
    const store = storeMocker(state)

    const subject = mount(<Provider store={store}><DatasetDetailView /></Provider>)

    expect(subject.find(CallToActionButton).props().url).toBe(`${window.API_HOST}/api/v1/dataset/${state.datasetReducer.dataset.id}/download/presigned_url`)
  })
})
