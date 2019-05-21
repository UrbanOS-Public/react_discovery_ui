import { shallow, render } from 'enzyme'
import DetailToggleIcon from './detail-toggle-icon'
import Icon from '@material-ui/core/Icon'

describe('detail toggle icon', () => {
    let subject

    test('is expanded when props.expanded is true', () => {
        subject = shallow(<DetailToggleIcon expanded={true} />)
        expect(subject.find(Icon).prop('children')).toEqual('expand_less')
    })

    test('is expanded when props.expanded is false', () => {
        subject = shallow(<DetailToggleIcon expanded={false} />)
        expect(subject.find(Icon).prop('children')).toEqual('expand_more')
    })

})
