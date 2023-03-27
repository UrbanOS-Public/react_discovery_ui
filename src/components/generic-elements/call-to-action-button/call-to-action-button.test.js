import { shallow } from 'enzyme'
import CallToActionButton from './call-to-action-button'
import Modal from 'react-modal'
import { AuthenticatedHTTPClient } from '../../../utils/http-clients'

describe('call-to-action-button', () => {
  const createCallToActionButton = (extraProps = {}) => {
    return shallow(
      <CallToActionButton {...extraProps} />
    )
  }

  beforeEach(() => {
    window.open = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('it calls window.open onClick', done => {
    AuthenticatedHTTPClient.get = jest.fn()
    const presignedUrl = 'http://test.example.com/api/v1/presigned/url?key=123'
    AuthenticatedHTTPClient.get.mockImplementationOnce(() => ({
      status: 200,
      data: presignedUrl
    }))
    const subject = createCallToActionButton({ url: 'abc', format: 'csv', filename: 'dataset.csv' })

    subject.find('.call-to-action-button').simulate('click')

    const expectedUrl = presignedUrl + '&_format=csv'
    setTimeout(() => {
      expect(window.open).toBeCalledWith(expectedUrl)
      done()
    }, 100)
  })

  test('call to action is dependent on dataset sourceType', () => {
    let subject = createCallToActionButton({ url: 'abc', format: 'csv', filename: 'dataset.csv' })

    expect(subject.text().includes('Download')).toBe(true)

    subject = createCallToActionButton({ url: 'abc', format: 'csv', filename: 'dataset.csv', sourceType: 'remote', sourceUrl: 'https://www.google.com/' })

    expect(subject.text().includes('Open Dataset')).toBe(true)
  })

  test('Clicking the Call to Action Button for remote datasets opens dialog', () => {
    const subject = createCallToActionButton({ url: 'abc', format: 'csv', filename: 'dataset.csv', sourceType: 'remote', sourceUrl: 'https://www.google.com/' })

    subject.find('.call-to-action-button').simulate('click')

    expect(subject.find(Modal).props().isOpen).toBe(true)
  })

  test('clicking continues opens a new window with the sourceUrl', () => {
    global.open = jest.fn()

    const subject = createCallToActionButton({ url: 'abc', format: 'csv', filename: 'dataset.csv', sourceType: 'remote', sourceUrl: 'https://www.google.com/' })

    subject.find('.call-to-action-button').simulate('click')

    subject.find('.modal-confirm').simulate('click')

    expect(global.open).toBeCalled()
  })
})
