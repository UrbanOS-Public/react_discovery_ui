import { shallow, mount } from 'enzyme'
import ApiExample from './api-example'

describe('api example', () => {
  it('renders parameters and headers in tables', () => {
    const params = [
      {
        name: 'bob',
        default: 'smith',
        description: 'a guy named bob',
        example: 'robert'
      },
      {
        name: 'bill',
        default: 'johnson',
        description: 'a guy named bill',
        example: 'william'
      }
    ]

    const wrapper = shallow(<ApiExample params={params} />)

    const cells = wrapper.find('td')

    expect(cells.length).toBe(12)
    expect(cells.at(0).text()).toBe('bob')
    expect(cells.at(1).text()).toBe('smith')
    expect(cells.at(2).text()).toBe('robert')
    expect(cells.at(3).text()).toBe('a guy named bob')
    expect(cells.at(4).text()).toBe('bill')
    expect(cells.at(5).text()).toBe('johnson')
    expect(cells.at(6).text()).toBe('william')
    expect(cells.at(7).text()).toBe('a guy named bill')
    expect(cells.at(8).text()).toBe('api_key')
    expect(cells.at(9).text()).toBe('No')
    expect(cells.at(10).text()).toBe('')
    expect(cells.at(11).text()).toBe('Include your unique api key as the value. You can generate your key by navigating to the “API Key” item on the “My Account” menu.')
  })

  it('does not render a table of params if no params are provided', () => {
    const wrapper = shallow(<ApiExample />)
    const parameters = wrapper.find('.example-parameters')

    expect(parameters.length).toBe(0)
  })

  it('renders examples as formatted code with descriptions', () => {
    const examples = [
      {
        description: 'This is how we query a thing',
        body: 'select * from thing'
      },
      {
        description: 'This is how we query a bob with another bob',
        body: 'select * from bob join bobi using (bob_id)'
      }
    ]

    const wrapper = mount(<ApiExample examples={examples} />)

    const exampleDivs = wrapper.find('div.example-body')

    expect(exampleDivs.length).toBe(2)
    expect(exampleDivs.at(0).find('.example-description').text()).toBe('This is how we query a thing')
    expect(exampleDivs.at(0).find('code').text()).toBe('select * from thing')
    expect(exampleDivs.at(1).find('.example-description').text()).toBe('This is how we query a bob with another bob')
    expect(exampleDivs.at(1).find('code').text()).toBe('select * from bob join bobi using (bob_id)')
  })

  it('creates a curl command for each example', () => {
    const examples = [
      {
        description: 'This is how we query a thing',
        body: 'select * from thing'
      },
      {
        description: 'This is how we query a bob with another bob',
        body: 'select * from bob join bobi using (bob_id)'
      }
    ]

    const wrapper = mount(<ApiExample examples={examples} url='localhost:5000/api' />)
    const curlDivs = wrapper.find('div.secret-curl-field')
    expect(curlDivs.length).toBe(2)
    expect(curlDivs.at(0).text()).toBe("curl -X POST 'localhost:5000/api' -H 'Content-Type: text/plain' -H 'api_key: USER_API_KEY_HERE' -d 'select * from thing'")
    expect(curlDivs.at(1).text()).toBe("curl -X POST 'localhost:5000/api' -H 'Content-Type: text/plain' -H 'api_key: USER_API_KEY_HERE' -d 'select * from bob join bobi using (bob_id)'")
  })
})
