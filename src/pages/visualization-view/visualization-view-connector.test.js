import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import ConnectedVisualizationView from '.'
import SaveButtonPopover from '../../components/save-button-popover'

describe('visualization view', () => {
  let storeMocker, state

  beforeEach(() => {
    storeMocker = configureStore([])
    state = {
      visualization: {
        visualization: {
          allowedActions: [{name: 'create_copy'}]
        }
      },
      queryReducer: { isQueryLoading: false },
      datasetReducer: {},
      presentation: {}
    }
  })

  it('visualization allowedActions are passed to SaveButtonPopover', () => {
    const store = storeMocker(state)

    const fakeRouterMatch = { params: {} }
    const history = createMemoryHistory()
    const subject = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedVisualizationView match={fakeRouterMatch} />
        </Router>
      </Provider>
    )

    expect(subject.find(SaveButtonPopover).props().allowedActions).toEqual(['create_copy'])
  })
})
