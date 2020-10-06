import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import ConnectedDatasetView from '.'
import DatasetView from './dataset-view'
import VisualizationSaveMenuItem from '../../components/visualization-save-menu-item'
import { visualizationSave } from '../../store/actions'
import Auth0Client from '../../auth/auth0-client-provider'

const fakeAuth0Client = {
  isAuthenticated: (() => Promise.resolve(false)),
}

describe('visualization view', () => {
  let storeMocker, state, store, subject

  const id = 'id'
  const tableName = 'table_name'
  const query = "SELECT * FROM table_name\nLIMIT 200"
  const title = 'title'
  const chart = {data: [], layout: {}, frames: []}

  beforeEach(() => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true
      })),
    });
    Auth0Client.get = jest.fn(() => Promise.resolve(fakeAuth0Client))
    storeMocker = configureStore([])
    state = {
      visualization: {
        visualization: {
          id, title, allowedActions: [{name: 'create_copy'}]
        },
        chart
      },
      queryReducer: { isQueryLoading: false },
      datasetReducer: {
        dataset: {
          id: '123',
          systemName: tableName,
          organization: {}
        }
      },
      presentation: {}
    }
    store = storeMocker(state)

    const fakeRouterMatch = { params: {} }
    const fakeLocation = { search: '?selectedIndex=1' }
    const history = createMemoryHistory()
    subject = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedDatasetView match={fakeRouterMatch} location={fakeLocation} />
        </Router>
      </Provider>
    )
  })

  it('visualization allowedActions are passed to VisualizationSaveMenuItem', () => {
    expect(subject.find(VisualizationSaveMenuItem).props().allowedActions).toEqual(['create_copy'])
  })

  it('dispatches the proper visualizationSave action when visualization is saved as a copy', () => {
    const shouldCreateCopy = true
    subject.find(DatasetView).setState({localTitle: title})

    subject.find(VisualizationSaveMenuItem).props().handleSaveOrUpdate({ shouldCreateCopy })

    expect(store.getActions()).toContainEqual(visualizationSave({id, query, title, shouldCreateCopy}))
  })
})
