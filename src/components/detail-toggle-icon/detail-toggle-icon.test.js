import { shallow, render } from 'enzyme'
import DetailToggleIcon from './detail-toggle-icon'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

describe('detail toggle icon', () => {
  let subject

  test('is expanded when props.expanded is true', () => {
    subject = shallow(<DetailToggleIcon expanded />)
    expect(subject.find(ExpandLess)).toHaveLength(1)
    expect(subject.find(ExpandMore)).toHaveLength(0)
  })

  test('is expanded when props.expanded is false', () => {
    subject = shallow(<DetailToggleIcon expanded={false} />)
    expect(subject.find(ExpandLess)).toHaveLength(0)
    expect(subject.find(ExpandMore)).toHaveLength(1)
  })
})
