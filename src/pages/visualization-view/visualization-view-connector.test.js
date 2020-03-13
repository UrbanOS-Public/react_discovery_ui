import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import ConnectedVisualizationView from '.'
import SaveButtonPopover from '../../components/save-button-popover'
import { visualizationSave } from '../../store/actions'

describe('visualization view', () => {
  let storeMocker, state, store, subject

  const id = 'id'
  const query = 'query'
  const title = 'title'
  const chart = {data: [], layout: {}, frames: []}

  beforeEach(() => {
    storeMocker = configureStore([])
    state = {
      visualization: {
        visualization: {
          id, title, allowedActions: [{name: 'create_copy'}]
        },
        chart
      },
      queryReducer: { queryText: query, isQueryLoading: false },
      datasetReducer: {},
      presentation: {}
    }

    store = storeMocker(state)

    const fakeRouterMatch = { params: { id } }
    const history = createMemoryHistory()
    subject = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedVisualizationView match={fakeRouterMatch} />
        </Router>
      </Provider>
    )
  })

  it('visualization allowedActions are passed to SaveButtonPopover', () => {
    expect(subject.find(SaveButtonPopover).props().allowedActions).toEqual(['create_copy'])
  })

  it('dispatches the proper visualizationSave action when visualization is saved as a copy', () => {
    const shouldCreateCopy = true

    subject.find(SaveButtonPopover).props().handleSaveOrUpdate({ shouldCreateCopy })

    expect(store.getActions()).toContainEqual(visualizationSave({id, query, title, shouldCreateCopy}))
  })
})
