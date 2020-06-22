import { shallow, mount } from 'enzyme'

import UserProfileView from './user-profile-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
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
      expect(subject.find(ReactTable)).toHaveLength(1)
      expect(subject.find(ReactTable).props().data).toHaveLength(2)
      expect(subject.find(ReactTable).props().data[0].id).toEqual("id1")
      expect(subject.find(ReactTable).props().data[1].id).toEqual("id2")
    })
  })

  describe("when the user is not logged in", () => {
    beforeEach(() => {
      subject = createSubject({ auth: { isAuthenticated: false }, loadFailure: true })
    })

    it("shows an error message", () => {
      expect(subject.find(ErrorComponent)).toHaveLength(1)
      expect(subject.find(ReactTable)).toHaveLength(0)
    })
  })

  describe("deleting a visualization", () => {
    let deleteElements, deleteFunction, clearFunction
    beforeEach(() => {
      deleteFunction = jest.fn()
      clearFunction = jest.fn()
      subject = createSubject({ clearDeleteVisualizationState: clearFunction, deleteVisualization: deleteFunction, auth: { isAuthenticated: true }, loadSuccess: true, visualizations: [{title: "Bobviz", id: "2"}] }, mount)
      deleteElements = subject.find('.delete-icon')
      deleteElements.at(0).simulate('click')
    })

    it("shows a delete element", () => {
      expect(deleteElements).toHaveLength(1)
    })

    it("shows a confirmation modal, when the delete element is clicked", () => {
      expect(subject.find(Modal).prop('isOpen')).toBe(true)
    })

    it("closes the modal when the cancel button is clicked", () => {
      subject.find('.modal-cancel').simulate('click')
      expect(subject.find(Modal).prop('isOpen')).toBe(false)
    })

    it("dispatches a request to clear the state, when the cancel button is clicked", () => {
      subject.find('.modal-cancel').simulate('click')
      expect(clearFunction).toHaveBeenCalled()
    })

    it("dispatches a request to delete a visualization when the confirm button is clicked", () => {
      subject.find('.modal-confirm').simulate('click')
      expect(deleteFunction).toHaveBeenCalledWith("2")
    })

    it("keeps the modal open while deleting", () => {
      subject.find('.modal-confirm').simulate('click')
      subject.setProps({ deleting: true })
      expect(subject.find(Modal).prop('isOpen')).toBe(true)
    })

    it("shows an error message and does not close the modal when deletion fails", () => {
      subject.setProps({ deleteFailure: true })
      expect(subject.find('.modal-error-text')).toHaveLength(1)
      expect(subject.find(Modal).prop('isOpen')).toBe(true)
    })
  })
})

const createSubject = (props = {}, depth = shallow) => {
  const defaultProps = {
    visualizations: [],
    loading: false,
    auth: { isAuthenticated: false },
    loadFailure: false,
    loadSuccess: false,
    deleting: false,
    deleteFailure: false,
    getUserVisualizations: jest.fn(),
    deleteVisualization: jest.fn(),
    clearDeleteVisualizationState: jest.fn()
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return depth(<UserProfileView {...propsWithDefaults} />)
}
