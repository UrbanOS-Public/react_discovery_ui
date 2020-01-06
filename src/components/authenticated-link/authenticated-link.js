import { createRef } from 'react'
import Auth0Client from '../../auth/auth0-client-provider'

export function AuthenticatedLink ({ url, filename, children }) {
  const link = createRef()
  var waiting 
  
  const handleAction = async () => {
    if (link.current.href) { return }
  
    const authClient = await Auth0Client.get()
    const token = await authClient.getTokenSilently()

    var authHeaders = {}
    if (token) {
        authHeaders = {
            'Authorization': `Bearer: ${token}`
        }
    }
    console.log("We got token: " + token)
    const result = await fetch(url, {	
      headers: {...authHeaders}
    })
    waiting = true
    const blob = await result.blob()
    waiting = false
    const href = window.URL.createObjectURL(blob)
    
    link.current.download = filename
    link.current.href = href
      
    link.current.click()
  }

  return (
    <authenticated-link>
        {waiting && <p>waiting</p>}
      <a role='button' ref={link} onClick={handleAction}>{children}</a>
    </authenticated-link>
  )

}

export default AuthenticatedLink