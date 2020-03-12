import { shallow } from 'enzyme'
import SaveIndicator from "../../components/generic-elements/save-indicator"
import SaveButtonPopover from './save-button-popover'


describe('save button popover', () => {
  let subject, saveHandler
  const id = '123456'

  describe('authenticated', () => {
    beforeEach(() => {
      saveHandler = jest.fn()
    })

    describe("when visualization save button is clicked to update a previously saved visualization", () => {
      beforeEach(() => {
        subject = createSubject({ isSaving: true })

        subject.find(".save-icon").simulate("click")
      })

      it("displays the saving status popover", () => {
        expect(subject.find(".save-prompt").props().open).toEqual(true)
      })

      it('sets the saving indicator', () => {
        expect(subject.find(SaveIndicator).length).toBe(1)
      })
    })

    describe("when visualization save icon is clicked to save a new visualization", () => {
      beforeEach(() => {
        subject = createSubject({ isSaving: false, handleSaveOrUpdate: saveHandler })

        subject.find(".save-icon").simulate("click")
      })

      it("displays the title prompt popover", () => {
        expect(subject.find(".save-prompt").props().open).toEqual(true)
        expect(subject.find(".title-input").length).toEqual(1)
        expect(subject.find(".save-button").length).toEqual(1)
      })

      it("disables the save button when no query title has been set", () => {
        expect(subject.find(".save-button").props().disabled).toBeTruthy()
      })

      it("sends create visualization event with the query, a query title, and the visualization", () => {
        subject.find(".save-button").simulate("click")
        expect(saveHandler).toHaveBeenCalled()
      })
    })

    it('enables the save button when the query title has been set', () => {
      subject = createSubject({ title: 'title' })

      expect(subject.find(".save-button").props().disabled).toBeFalsy()
    })

    describe('when save succeeds', () => {
      beforeEach(() => {
        subject = createSubject({ isSaveSuccess: true, linkUrl: '/visualization/123456' })
      })

      it('indicates the save succeeded', () => {
        expect(subject.find(SaveIndicator).props().success).toBe(true)
        expect(subject.find(SaveIndicator).props().failure).toBe(false)
        expect(subject.find(SaveIndicator).props().saving).toBe(false)
      })

      it('displays a generated link', () => {
        expect(subject.find(SaveIndicator).props().linkUrl).toBe(`/visualization/${id}`)
      })
    })

    describe('when save fails', () => {
      beforeEach(() => {
        subject = createSubject({ isSaveFailure: true })
      })

      it('indicates the save failed', () => {
        expect(subject.find(SaveIndicator).props().failure).toBe(true)
        expect(subject.find(SaveIndicator).props().success).toBe(false)
        expect(subject.find(SaveIndicator).props().saving).toBe(false)
      })
    })

    describe("when visualization is not able to be saved", () => {
      beforeEach(() => {
        subject = createSubject({ isSaveable: false })
      })

      it("disables the save button", () => {
        expect(subject.find('.save-icon').props().disabled).toBeTruthy()
      })
    })

    describe("when visualization is able to be saved", () => {
      beforeEach(() => {
        subject = createSubject({ isSaveable: true })
      })

      it("enables the save button", () => {
        expect(subject.find('.save-icon').props().disabled).toBeFalsy()
      })
    })

    it('does not show the login prompt', () => {
      subject = createSubject({ isAuthenticated: true })

      expect(subject.find(".login-prompt")).toHaveLength(0)
    })
  })

  describe('NOT authenticated', () => {
    beforeEach(() => {
      subject = createSubject({ isAuthenticated: false, title: 'title' })
    })

    it('displays a prompt for the user to login', () => {
      expect(subject.find(".login-prompt")).toHaveLength(1)
    })

    it('disables the save button even when otherwise saveable', () => {
      expect(subject.find('.save-button').props().disabled).toBeTruthy()
    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    isSaveable: false,
    title: undefined,
    handleTitleChange: jest.fn(),
    handleSaveOrUpdate: jest.fn(),
    isSaving: false,
    isSaveSuccess: false,
    isSaveFailure: false,
    linkUrl: undefined,
    isAuthenticated: true
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(<SaveButtonPopover {...propsWithDefaults} />)
}
