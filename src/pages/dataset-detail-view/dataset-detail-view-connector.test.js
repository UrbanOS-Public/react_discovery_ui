import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import DownloadButton from '../../components/generic-elements/download-button'
import DatasetDetailView from '.'

describe('dataset view', () => {
  let storeMocker, state

  beforeEach(() => {
    storeMocker = configureStore([])
    state = {
      datasetReducer: {
        dataset: {
          id: '123',
          sourceType: 'ingest',
          fileTypes: ['CSV'],
          sourceFormat: "BAD",
          organization: {},
          schema: [{ name: 'id', type: 'integer', description: 'id description' }]
        }

      },
      presentation: {}
    }
  })

  it('has a download button with the correct url', () => {
    const store = storeMocker(state)

    const subject = mount(<Provider store={store}><DatasetDetailView /></Provider>)

    expect(subject.find(DownloadButton).props().url).toBe(`${window.API_HOST}/api/v1/dataset/${state.datasetReducer.dataset.id}/download?_format=csv`)
  })
})
