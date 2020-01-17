import { createRef } from 'react'
import {AuthenticatedHTTPClient} from '../../utils/http-clients'

export function AuthenticatedLink ({ url, filename, link, children }) {
  // const link = createRef()
  console.log("going to download from AuthenicatedLink")
  
  const handleAction = async () => {
    console.log("Handling action!")
    if (link.current.href) { 
      console.log("href already set", link.current.href)
      return 
    }

  console.log("Getting authenticated url")
  const hardcodedUrl = 'https://data.dev.internal.smartcolumbusos.com/api/v1/dataset/28895f6e-518c-4c22-8a2b-f62d2df136cg/presign_url'
    const result = await AuthenticatedHTTPClient.get(hardcodedUrl)
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