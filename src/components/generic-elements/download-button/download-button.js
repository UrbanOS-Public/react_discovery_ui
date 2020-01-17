import './download-button.scss'
import { createRef } from 'react'
import {AuthenticatedHTTPClient} from '../../../utils/http-clients'

export function DownloadButton ({ url, format, filename }) {
  const link = createRef()
  const handleAction = async () => {
    if (link.current.href) { 
      console.log("href already set", link.current.href)
      return 
    }

    const result = await AuthenticatedHTTPClient.get(url)
    const downloadUrl = window.API_HOST + "/api/v1" + result.data + "&format=" + format
    
    link.current.download = filename
    link.current.href = downloadUrl      
    link.current.click()
    console.log("DONE with download", filename, downloadUrl)
  }

  return (
    <download-button>
      <a className='download-button' role='button' ref={link} rel='noopener noreferrer' onClick={handleAction}>Download</a>
    </download-button>
  )

}

export default DownloadButton
