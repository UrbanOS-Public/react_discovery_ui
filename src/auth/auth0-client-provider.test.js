import { default as createAuth0Client } from '@auth0/auth0-spa-js'
import auth0ClientProvider from './auth0-client-provider'

jest.mock('@auth0/auth0-spa-js')

describe('auth0-client-provider', () => {
  let client

  beforeEach(async () => {
    createAuth0Client
      .mockReturnValueOnce(Promise.resolve('first-instance'))
      .mockReturnValue(Promise.resolve('another-instance'))

    client = await auth0ClientProvider.get()
  })

  it('initializes with the correct domain and client ID', () => {
    expect(createAuth0Client).toBeCalledWith({
      domain: window.AUTH0_DOMAIN,
      client_id: window.AUTH0_CLIENT_ID,
      audience: window.AUTH0_AUDIENCE,
      redirect_uri: `${window.location.origin}/oauth`
    })
  })

  describe('retrieving again', () => {
    it('gets the same instance', async () => {
      const client2 = await auth0ClientProvider.get()

      expect(client2).toBe(client)
    })
  })
})

