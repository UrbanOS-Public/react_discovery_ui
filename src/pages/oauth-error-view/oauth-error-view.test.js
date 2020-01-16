import { shallow } from 'enzyme'
import OAuthErrorView from './oauth-error-view'

describe('OAuth error view', () => {
    it('displays the error description from the query string', () => {
        const queryString = '?error_description=testing'
        Object.defineProperty(window, 'location', { value: { search: queryString }})

        const subject = shallow(<OAuthErrorView />)

        expect(subject.find(".error-message").text()).toEqual("testing")
    })
})
