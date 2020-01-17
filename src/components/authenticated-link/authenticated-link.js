import { createRef } from 'react'
import {AuthenticatedHTTPClient} from '../../utils/http-clients'

export function AuthenticatedLink ({ url, filename, children }) {
  const link = createRef()
  const handleAction = async () => {
    if (link.current.href) { 
      console.log("href already set", link.current.href)
      return 
    }

    const result = await AuthenticatedHTTPClient.get(url)
    const downloadUrl = window.API_HOST + "/api/v1" + result.data + "&format=csv"
    
    link.current.download = filename
    link.current.href = downloadUrl      
    link.current.click()
    console.log("DONE with download", filename, downloadUrl)
  }

  return (
    <authenticated-link>
      <a className='auth-link' role='button' ref={link} target="_blank" onClick={handleAction}>{children}</a>
    </authenticated-link>
  )

}

export default AuthenticatedLink