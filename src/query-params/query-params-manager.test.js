import withQueryParamsManager, {QueryParamsManager} from './query-params-manager'
import {mount} from 'enzyme'

describe('QueryParamsManager', () => {
  describe('property access', () => {
    it('returns all parameters with appropriate deserialization', () => {
      const queryParams = '?apiAccessible=false&page=9000'
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.getQueryParams()).toMatchObject({apiAccessible: false, currentPage: 9000})
      // TODO - it's important to also test that this gives the defaults
    })

    it('returns apiAccessible', () => {
      const queryParams = '?apiAccessible=false'
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.apiAccessible).toEqual(false)
    })

    it('returns default apiAccessible if missing', () => {
      const queryParams = ''
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.apiAccessible).toEqual(true)
    })

    it('returns sort order', () => {
      const queryParams = '?sort=last_mod'
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.sortOrder).toEqual('last_mod')
    })

    it('returns default sort order if missing', () => {
      const queryParams = ''
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.sortOrder).toEqual('name_asc')
    })

    it('returns current page if integer', () => {
      const queryParams = '?page=9000'
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.currentPage).toEqual(9000)
    })

    it('returns first page if non-integer', () => {
      const queryParams = '?page=nine_thousand'
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.currentPage).toEqual(1)
    })

    it('returns first page if missing', () => {
      const queryParams = '?other-stuff=things'
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.currentPage).toEqual(1)
    })

    it('returns search text', () => {
      const queryParams = '?q=power%20level'
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.searchText).toEqual('power level')
    })

    it('returns currently applied facets', () => {
      const queryParamsUnencoded = '?facets[organization][]=Ohio Geographically Referenced Information Program (OGRIP)&facets[keywords][]=Transportation'
      const queryParams = decodeURI(queryParamsUnencoded)
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.facets).toEqual({
        organization: ['Ohio Geographically Referenced Information Program (OGRIP)'],
        keywords: ['Transportation']
      })
    })

    it('returns empty facets if missing', () => {
      const queryParamsUnencoded = '?other=stuff'
      const queryParams = decodeURI(queryParamsUnencoded)
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.facets).toEqual({})
    })

    it('returns empty facets if unparseable (a lot of times it will just give weird results instead of failing to parse)', () => {
      const queryParamsUnencoded = '?facets organization]=Ohio Geographically Referenced Information Program (OGRIP)&facets[keywords=Transportation'
      const queryParams = decodeURI(queryParamsUnencoded)
      const history = {
        location: {
          search: queryParams
        }
      }
      const subject = new QueryParamsManager(history)
      expect(subject.facets).toEqual({})
    })
  })
  describe('updates', () => {
    describe('toggleApiAccessible', () => {
      it('with a default flag, updates apiAccessible', () => {
        const historyPushSpy = jest.fn()
        const history = {
          push: historyPushSpy,
          location: {
            search: ''
          }
        }
        const subject = new QueryParamsManager(history)
        subject.toggleApiAccessible()

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'apiAccessible=false'
        })
      })

      it('with a true flag, updates apiAccessible', () => {
        const historyPushSpy = jest.fn()
        const history = {
          push: historyPushSpy,
          location: {
            search: '?apiAccessible=true'
          }
        }
        const subject = new QueryParamsManager(history)
        subject.toggleApiAccessible()

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'apiAccessible=false'
        })
      })

      it('with a false flag updates apiAccessible', () => {
        const historyPushSpy = jest.fn()
        const history = {
          push: historyPushSpy,
          location: {
            search: '?apiAccessible=false'
          }
        }
        const subject = new QueryParamsManager(history)
        subject.toggleApiAccessible()

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: 'apiAccessible=true'
        })
      })
    })

    describe('toggleFacets', () => {
      it('with default facets (none), updates facets', () => {
        const historyPushSpy = jest.fn()
        const history = {
          push: historyPushSpy,
          location: {
            search: ''
          }
        }
        const subject = new QueryParamsManager(history)
        subject.toggleFacet('organization', 'SCOS')

        expect(historyPushSpy).toHaveBeenCalledWith({
          search: encodeURI('facets[organization][]=SCOS')
        })
      })

      it('with existing facets for the name (organization), toggles facet', () => {
        const historyPushSpy = jest.fn()
        const history = {
          push: historyPushSpy,
          location: {
            search: '?facets%5Borganization%5D%5B%5D=SCOS'
          }
        }
        const subject = new QueryParamsManager(history)
        subject.toggleFacet('organization', 'SCOS')

        expect(historyPushSpy).toHaveBeenCalledWith({search: ''})
      })
    })

    it('with existing facets for the name (keywords), add new facets', () => {
      const historyPushSpy = jest.fn()
      const history = {
        push: historyPushSpy,
        location: {
          search: '?facets%5Bkeywords%5D%5B%5D=Ohio'
        }
      }
      const subject = new QueryParamsManager(history)
      subject.toggleFacet('keywords', 'Transportation')

      expect(historyPushSpy).toHaveBeenCalledWith({
        search: encodeURI('facets[keywords][]=Ohio&facets[keywords][]=Transportation')
      })
    })

    it('with existing facets for the other names (organization), add new facets and keeps others', () => {
      const historyPushSpy = jest.fn()
      const history = {
        push: historyPushSpy,
        location: {
          search: '?facets%5Bkeywords%5D%5B%5D=Ohio&facets%5Borganization%5D%5B%5D=SCOS'
        }
      }
      const subject = new QueryParamsManager(history)
      subject.toggleFacet('keywords', 'Ohio')

      expect(historyPushSpy).toHaveBeenCalledWith({
        search: encodeURI('facets[organization][]=SCOS')
      })
    })
  })
})

describe('withQueryParamsManager', () => {
  it('injects an instance of the query params manager into the wrapped component', () => {
    const wrappedComponent = (props) => {
      return <wrapped-component {...props}/>
    }
    const Rapper = withQueryParamsManager(wrappedComponent, jest.fn())

    const subject = mount(<Rapper history={{location: {}}} />)

    expect(subject.find('wrapped-component').prop('queryParamsManager')).toBeInstanceOf(QueryParamsManager)
  })

  it('calls handler on the initial render', () => {
    const wrappedComponent = (props) => {
      return <wrapped-component {...props}/>
    }
    const searchSpy = jest.fn()
    const Rapper = withQueryParamsManager(wrappedComponent, searchSpy)

    const subject = mount(
      <Rapper history={{location: {search: '?apiAccessible=false'}}} />)

    expect(searchSpy).toHaveBeenCalledWith(expect.objectContaining({apiAccessible: false}))

  })

  it('calls handler on query string updates', () => {
    const wrappedComponent = (props) => {
      return <wrapped-component {...props}/>
    }
    const searchSpy = jest.fn()
    const Rapper = withQueryParamsManager(wrappedComponent, searchSpy)

    const subject = mount(
        <Rapper history={{location: {search: '?apiAccessible=false'}}} />)

    expect(searchSpy).toHaveBeenCalledWith(expect.objectContaining({apiAccessible: false}))

    subject.setProps({history: {location: {search: '?apiAccessible=true'}}})

    expect(searchSpy).toHaveBeenCalledWith(expect.objectContaining({apiAccessible: true}))
  })

  it('does not call handler on other updates', () => {
    const wrappedComponent = (props) => {
      return <wrapped-component {...props}/>
    }
    const searchSpy = jest.fn()
    const Rapper = withQueryParamsManager(wrappedComponent, searchSpy)

    const subject = mount(
        <Rapper history={{location: {search: '?apiAccessible=false'}}} />)

    expect(searchSpy).toHaveBeenCalledWith(expect.objectContaining({apiAccessible: false}))

    subject.setProps({otherThing: 'stuff'})

    expect(searchSpy).toHaveBeenCalledTimes(1)
  })
})
