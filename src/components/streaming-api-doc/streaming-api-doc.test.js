import { render } from 'enzyme'
import StreamingApiDoc from './streaming-api-doc'

describe('streaming-api-doc element', () => {
  let subject

  beforeEach(() => {
    const matchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true
      })),
    });
  })

  test('the example should have proper topic', () => {
    subject = render(<StreamingApiDoc dataset={{ id: 'coda_stuff', name: 'data_name', organization: { name: 'org_name', sourceType: "stream" } }} />)

    expect(subject.find('.example-code').text()).toContain(
      "streaming:org_name__data_name"
    )
  })
})
