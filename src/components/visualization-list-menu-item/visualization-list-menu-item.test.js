import { shallow } from 'enzyme'
import VisualizationListMenuItem from './visualization-list-menu-item'
import Auth0LoginZone from '../auth0-login-zone'

describe('visualization list menu item', () => {
  let subject
  describe('when user clicks the icon to see their saved visualizations', () => {
    describe('and when the user is not logged in', () => {
      beforeEach(() => {
        subject = createSubject({ isAuthenticated: false })
        subject.find('.button-disabled').simulate('click')
        subject.find('.link-disabled').simulate('click')
      })

      it('displays a prompt for the user to log in', () => {
        expect(subject.find('.login-prompt').props().open).toBeTruthy()
        expect(subject.find(Auth0LoginZone)).toHaveLength(1)
      })
    })

    describe('and when the user is logged in', () => {
      beforeEach(() => {
        subject = createSubject({ isAuthenticated: true })
        subject.find('.button-enabled').simulate('click')
      })

      it('does not display a login prompt', () => {
        expect(subject.find('.login-prompt').props().open).toBeFalsy()
      })
    })
  })
})

const createSubject = (props = {}) => {
  const defaultProps = {
    isAuthenticated: false
  }

  const propsWithDefaults = Object.assign({}, defaultProps, props)

  return shallow(<VisualizationListMenuItem {...propsWithDefaults} />)
}
