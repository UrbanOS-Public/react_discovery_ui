import { shallow } from 'enzyme'
import CollapsableBox from './collapsable-box'

describe('CollapsableBox ', () => {
  test('clicking the header changes the expanded state', () => {
    const subject = shallow(
      <CollapsableBox headerHtml={"<div />"} expanded={false}>
        <div />
      </CollapsableBox>
    )
    subject.find('.header-container').simulate('click')
    expect(subject.state("expanded")).toEqual(true)
  })
})
