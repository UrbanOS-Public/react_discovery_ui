import "./download-button.scss";
import React from "react";
import { AuthenticatedHTTPClient } from "../../../utils/http-clients";

export function DownloadButton({ url, format }) {
  const handleAction = async () => {
    const result = await AuthenticatedHTTPClient.get(url);
    const downloadUrl = result.data + "&format=" + format;
    window.location.href = downloadUrl;
  };

  return (
    <download-button>
      <a
        className="download-button"
        role="button"
        rel="noopener noreferrer"
        onClick={handleAction}
      >
        Download
      </a>
    </download-button>
  );
}

export default DownloadButton;
