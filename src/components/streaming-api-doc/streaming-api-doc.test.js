import { shallow } from 'enzyme'
import StreamingApiDoc from './streaming-api-doc'

describe('streaming-api-doc element', () => {
    let subject

    test('the example should have proper topic', () => {
        subject = shallow(<StreamingApiDoc dataset={{ id: 'coda_stuff', name: 'data_name', sourceFormat: 'csv', organization: { name: 'org_name', sourceType: "stream" } }} />)

        expect(subject.find('.example-code').text()).toContain(
            "streaming:org_name__data_name"
        )
    })

    test('clicking the header changes the expanded state', () => {
        subject = shallow(<StreamingApiDoc dataset={{ id: 'coda_stuff', name: 'data_name', sourceFormat: 'csv', organization: { name: 'coda_name' } }} />)
        subject.find('.header-container').simulate('click')
        expect(subject.state("expanded")).toEqual(true)
    })

})