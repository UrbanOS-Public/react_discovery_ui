import withSearchParamsManager, {SearchParamsManager, defaults} from './search-params-manager'
import { mount, shallow } from 'enzyme'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { datasetSearch } from '../store/actions.js'
import React from 'react'

describe('SearchParamsManager', () => {
  describe('property access', () => {
    describe('all query params', () => {
      it('returns all parameters with appropriate deserialization', () => {
        const params = '?apiAccessible=false&page=9000'
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.getParams()).toMatchObject({apiAccessible: false, page: 9000})
      })

      it('returns all the defaults if the query params are empty', () => {
        const params = ''
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.getParams()).toEqual({
          apiAccessible: defaults.apiAccessible,
          page: defaults.page,
          sortOrder: defaults.sortOrder,
          searchText: defaults.searchText,
          facets: defaults.facets
        })
      })
    })

    describe('apiAccessible', () => {
      it('returns apiAccessible', () => {
        const params = '?apiAccessible=false'
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.apiAccessible).toEqual(false)
      })

      it('returns default apiAccessible if missing', () => {
        const params = ''
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.apiAccessible).toEqual(true)
      })
    })

    describe('sortOrder', () => {
      it('returns sort order', () => {
        const params = '?sort=last_mod'
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.sortOrder).toEqual('last_mod')
      })

      it('returns default sort order if missing', () => {
        const params = ''
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.sortOrder).toEqual('name_asc')
      })
    })

    describe('page', () => {
      it('returns current page if integer', () => {
        const params = '?page=9000'
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.page).toEqual(9000)
      })

      it('returns first page if non-integer', () => {
        const params = '?page=nine_thousand'
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.page).toEqual(1)
      })

      it('returns first page if missing', () => {
        const params = '?other-stuff=things'
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.page).toEqual(1)
      })
    })

    describe('searchText', () => {
      it('returns search text', () => {
        const params = '?q=power%20level'
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.searchText).toEqual('power level')
      })

      it('returns default search text if missing', () => {
        const params = ''
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.searchText).toEqual('')
      })
    })

    describe('facets', () => {
      it('returns currently applied facets', () => {
        const paramsUnencoded = '?facets[organization][]=Ohio Geographically Referenced Information Program (OGRIP)&facets[organization][]=stuff&facets[keywords][]=Transportation'
        const params = decodeURI(paramsUnencoded)
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.facets).toEqual({
          organization: ['Ohio Geographically Referenced Information Program (OGRIP)', 'stuff'],
          keywords: ['Transportation']
        })
      })

      it('returns empty facets if missing', () => {
        const paramsUnencoded = '?other=stuff'
        const params = decodeURI(paramsUnencoded)
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.facets).toEqual({})
      })

      it('returns empty facets if unparseable (a lot of times it will just give weird results instead of failing to parse)', () => {
        const paramsUnencoded = '?facets organization]=Ohio Geographically Referenced Information Program (OGRIP)&facets[keywords=Transportation'
        const params = decodeURI(paramsUnencoded)
        const history = {
          location: {
            search: params
          }
        }
        const subject = new SearchParamsManager(history)
        expect(subject.facets).toEqual({})
      })
    })
  })

  describe('updates', () => {
    describe('apiAccessible', () => {
      it('with a default flag, updates apiAccessible', () => {
        const {historyPushSpy, history} = createFakeHistory('')

        const subject = new SearchParamsManager(history)
        subject.toggleApiAccessible()

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'apiAccessible=false&page=1'
        })
      })

      it('with a true flag, updates apiAccessible', () => {
        const {historyPushSpy, history} = createFakeHistory('?apiAccessible=true')

        const subject = new SearchParamsManager(history)
        subject.toggleApiAccessible()

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'apiAccessible=false&page=1'
        })
      })

      it('with a false flag updates apiAccessible', () => {
        const {historyPushSpy, history} = createFakeHistory('?apiAccessible=false&knuckles=true')

        const subject = new SearchParamsManager(history)
        subject.toggleApiAccessible()

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'apiAccessible=true&knuckles=true&page=1'
        })
      })

      it('resets the page number to 1', () => {
        const {historyPushSpy, history} = createFakeHistory('?apiAccessible=true&page=5')

        const subject = new SearchParamsManager(history)
        subject.toggleApiAccessible()

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'apiAccessible=false&page=1'
        })
      })
    })

    describe('sortOrder', () => {
      it('with a default sort order, updates sort order', () => {
        const {historyPushSpy, history} = createFakeHistory('')

        const subject = new SearchParamsManager(history)
        subject.updateSortOrder('last_mod')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'sort=last_mod'
        })
      })

      it('with an existing sort order, updates sort order', () => {
        const {historyPushSpy, history} = createFakeHistory('?sort=last_mod&knuckles=true')

        const subject = new SearchParamsManager(history)
        subject.updateSortOrder('name_asc')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'sort=name_asc&knuckles=true'
        })
      })
    })

    describe('page', () => {
      it('with a default page number, updates page number', () => {
        const {historyPushSpy, history} = createFakeHistory('')

        const subject = new SearchParamsManager(history)
        subject.updatePage(5)

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'page=5'
        })
      })

      it('with an existing search text, updates page number', () => {
        const {historyPushSpy, history} = createFakeHistory('?page=1&knuckles=true')

        const subject = new SearchParamsManager(history)
        subject.updatePage(5)

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'page=5&knuckles=true'
        })
      })
    })

    describe('searchText', () => {
      it('with a default search text, updates search text and sort', () => {
        const {historyPushSpy, history} = createFakeHistory('')

        const subject = new SearchParamsManager(history)
        subject.updateSearchText('sweet_query')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'q=sweet_query&page=1&sort=relevance'
        })
      })

      it('with an existing search text, updates search text and sort', () => {
        const {historyPushSpy, history} = createFakeHistory('?q=the_world&knuckles=true')

        const subject = new SearchParamsManager(history)
        subject.updateSearchText('sweet_query')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'q=sweet_query&knuckles=true&page=1&sort=relevance'
        })
      })

      it('resets the page number to 1 and sort to relevance', () => {
        const {historyPushSpy, history} = createFakeHistory('?q=the_world&page=5')

        const subject = new SearchParamsManager(history)
        subject.updateSearchText('sweet_query')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'q=sweet_query&page=1&sort=relevance'
        })
      })

      it('does not reset sort to relevance if sort is set to name_desc', () => {
        const {historyPushSpy, history} = createFakeHistory('?q=the_world&sort=name_desc')

        const subject = new SearchParamsManager(history)
        subject.updateSearchText('sweet_query')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'q=sweet_query&sort=name_desc&page=1'
        })
      })

      it('does not reset sort to relevance if sort is set to las_mod', () => {
        const {historyPushSpy, history} = createFakeHistory('?q=the_world&sort=last_mod')
        
        const subject = new SearchParamsManager(history)
        subject.updateSearchText('sweet_query')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'q=sweet_query&sort=last_mod&page=1'
        })
      })

      it('keeps sort at relevance if sort is set to relevance', () => {
        const {historyPushSpy, history} = createFakeHistory('?q=the_world&sort=relevance')

        const subject = new SearchParamsManager(history)
        subject.updateSearchText('sweet_query')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'q=sweet_query&sort=relevance&page=1'
        })
      })
    })

    describe('facets', () => {
      it('with default facets (none), updates facets', () => {
        const {historyPushSpy, history} = createFakeHistory('')

        const subject = new SearchParamsManager(history)
        subject.toggleFacet('organization', 'SCOS')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: encodeURI('facets[organization][]=SCOS&page=1')
        })
      })

      it('with existing facets for the name (organization), toggles facet', () => {
        const {historyPushSpy, history} = createFakeHistory('?facets%5Borganization%5D%5B%5D=SCOS')

        const subject = new SearchParamsManager(history)
        subject.toggleFacet('organization', 'SCOS')

        expect(historyPushSpy).toHaveBeenCalledWith({search: 'page=1'})
      })

      it('with existing facets for the name (keywords), add new facets', () => {
        const {historyPushSpy, history} = createFakeHistory('?facets%5Bkeywords%5D%5B%5D=Ohio')

        const subject = new SearchParamsManager(history)
        subject.toggleFacet('keywords', 'Transportation')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: encodeURI('facets[keywords][]=Ohio&facets[keywords][]=Transportation&page=1')
        })
      })

      it('with existing facets for the other names (organization), add new facets and keeps others', () => {
        const {historyPushSpy, history} = createFakeHistory('?facets%5Bkeywords%5D%5B%5D=Ohio&facets%5Borganization%5D%5B%5D=SCOS')

        const subject = new SearchParamsManager(history)
        subject.toggleFacet('keywords', 'Ohio')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: encodeURI('facets[organization][]=SCOS&page=1')
        })
      })

      it('resets the page number to 1', () => {
        const {historyPushSpy, history} = createFakeHistory('?facets%5Bkeywords%5D%5B%5D=Ohio&facets%5Borganization%5D%5B%5D=SCOS&page=5')

        const subject = new SearchParamsManager(history)
        subject.toggleFacet('keywords', 'Ohio')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: encodeURI('facets[organization][]=SCOS&page=1')
        })
      })
    })
  })
})

describe('withSearchParamsManager', () => {
  const reducer = (state = [], action) => {
    return [...state, action]
  }
  let store, Rapper

  beforeEach(() => {
    const wrappedComponent = (props) => {
      return <wrapped-component {...props}/>
    }
    store = createStore(reducer)
    Rapper = withSearchParamsManager(wrappedComponent)
  })

  it('injects an instance of the query params manager into the wrapped component', () => {
    const subject = mount(
      <TestableProvider store={store}>
        <Rapper history={{location: {}}} />
      </TestableProvider>
    )

    expect(subject.find('wrapped-component').prop('searchParamsManager')).toBeInstanceOf(SearchParamsManager)
  })

  it('dispatches search on the initial render', () => {
    const subject = mount(
      <TestableProvider store={store}>
        <Rapper history={{location: {search: '?apiAccessible=false'}}} />
      </TestableProvider>
    )

    expect(store.getState()).toContainEqual(datasetSearch(expect.objectContaining({apiAccessible: false})))
  })

  it('dispatches search on string updates', () => {
    const subject = mount(
      <TestableProvider store={store}>
        <Rapper history={{location: {search: '?apiAccessible=false'}}} />
      </TestableProvider>
    )

    expect(store.getState()).toContainEqual(datasetSearch(expect.objectContaining({apiAccessible: false})))

    subject.setProps({history: {location: {search: '?apiAccessible=true'}}})

    expect(store.getState()).toContainEqual(datasetSearch(expect.objectContaining({apiAccessible: true})))
  })

  it('does not dispatch search on other updates', () => {
    const subject = mount(
      <TestableProvider store={store}>
        <Rapper history={{location: {search: '?apiAccessible=false'}}} />
      </TestableProvider>
    )

    expect(store.getState()).toContainEqual(datasetSearch(expect.objectContaining({apiAccessible: false})))

    subject.setProps({otherThing: 'stuff'})

    expect(store.getState().pop()).toEqual(datasetSearch(expect.objectContaining({apiAccessible: false})))
  })
})

function createFakeHistory(search) {
  const historyPushSpy = jest.fn()
  const history = {
    push: historyPushSpy,
    location: {search}
  }
  return {historyPushSpy, history}
}

function TestableProvider({children, store, ...props}) {
  return (
    <Provider store={store}>
      {React.cloneElement(children, {...props})}
    </Provider>
  )
}
