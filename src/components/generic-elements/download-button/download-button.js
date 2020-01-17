import './download-button.scss'
import { createRef, useState } from 'react'
import React from 'react'
import {AuthenticatedHTTPClient} from '../../../utils/http-clients'

export function DownloadButton ({ url, format, filename }) {

  const link = createRef()
  const [downloadUrl, setDownloadUrl] = useState()
  
  React.useEffect(() => {
    if (downloadUrl) {
      link.current.click()
    }
  }, [downloadUrl])

  const handleAction = async () => {
    const result = await AuthenticatedHTTPClient.get(url)
    const downloadUrl = window.API_HOST + "/api/v1" + result.data + "&format=" + format
    setDownloadUrl(downloadUrl)
  }

  return (
    <download-button>
      <a className='download-button' role='button' ref={link} href={downloadUrl} download={filename} rel='noopener noreferrer' onClick={handleAction}>Download</a>
    </download-button>
  )

}

export default DownloadButton
