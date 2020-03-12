import {shallow} from 'enzyme'
import UserPageButtonPopover from "./user-page-button-popover"
import Auth0LoginZone from '../auth0-login-zone'

describe('user page button popover', () => {
  let subject
  describe('when user clicks the icon to see their saved visualizations', () => {
    describe('and when the user is not logged in', () => {
      beforeEach(() => {
        subject = createSubject({ isAuthenticated: false })
        subject.find('.button-disabled').simulate("click")
        subject.find('.link-disabled').simulate("click")
      })

      it("displays a prompt for the user to log in", () => {
        expect(subject.find(".login-prompt").props().open).toBeTruthy()
        expect(subject.find(Auth0LoginZone)).toHaveLength(1)
      })
    })

    describe('and when the user is logged in', () => {
      beforeEach(() => {
        subject = createSubject({ isAuthenticated: true })
        subject.find('.button-enabled').simulate("click")
      })

      it('marks the link to the user\'s saved visualizations as enabled', () => {
        expect(subject.find('.link-enabled')).toHaveLength(1)
      })

      it('has the correct endpoint for the user\'s saved visualizations', () => {
        expect(subject.find('.link-enabled').props().to).toEqual('/user')
      })

      it("does not display a login prompt", () => {
        expect(subject.find(".login-prompt").props().open).toBeFalsy()
      })
    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    isAuthenticated: false
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(<UserPageButtonPopover {...propsWithDefaults} />)
}
