import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import ConnectedDatasetView from '.'
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
      datasetReducer: {
        dataset: {
          id: '123',
          organization: {}
        }
      },
      presentation: {}
    }
  })

  it('visualization allowedActions are passed to SaveButtonPopover', () => {
    const store = storeMocker(state)

    const fakeRouterMatch = { params: {} }
    const fakeLocation = { search: '?selectedIndex=1' }
    const history = createMemoryHistory()
    const subject = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedDatasetView match={fakeRouterMatch} location={fakeLocation} />
        </Router>
      </Provider>
    )

    expect(subject.find(SaveButtonPopover).props().allowedActions).toEqual(['create_copy'])
  })
})
