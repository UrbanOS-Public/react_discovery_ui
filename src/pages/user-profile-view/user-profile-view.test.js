import { shallow } from 'enzyme'

import UserProfileView from './user-profile-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import ErrorComponent from '../../components/generic-elements/error-component'


describe("user profile view", () => {
  let subject

  it("shows the loading element on page load", () => {
    subject = createSubject()
    expect(subject.find(LoadingElement)).toHaveLength(1)
  })

  describe("when the user is signed in", () => {
    beforeEach(() => {
      const visualizations = [
        { title: "title1", id: "id1", created: "2019-12-09T21:04:06", updated: "2019-12-09T21:17:14" },
        { title: "title2", id: "id2" }
      ]

      subject = createSubject({
        visualizations: visualizations,
        auth: { isAuthenticated: true },
        loadSuccess: true
      })
    })

    it("provides a table with the visualizations' information", () => {
      const columns = [
        { Header: "Title", accessor: "title", headerClassName: "table-header" },
        { Header: "Date Created", accessor: "created", headerClassName: "table-header" },
        { Header: "Date Modified", accessor: "updated", headerClassName: "table-header" }
      ]

      expect(subject.find(ReactTable)).toHaveLength(1)
      expect(subject.find(ReactTable).props().data).toHaveLength(2)
      expect(subject.find(ReactTable).props().columns).toEqual(columns)
      expect(subject.find(ReactTable).props().data[0].id).toEqual("id1")
      expect(subject.find(ReactTable).props().data[1].id).toEqual("id2")
    })
  })

  describe("when the user is not logged in", () => {
    beforeEach(() => {
      subject = createSubject({ auth: { isAuthenticated: false}, loadFailure: true })
    })

    it("shows an error message", () => {
      expect(subject.find(ErrorComponent)).toHaveLength(1)
      expect(subject.find(ReactTable)).toHaveLength(0)
    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    visualizations: [],
    loading: false,
    auth: { isAuthenticated: false },
    loadFailure: false,
    loadSuccess: false
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(<UserProfileView {...propsWithDefaults} />)
}
