import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './query-form.scss'
import LoadingElement from '../generic-elements/loading-element'
import RecommendationList from '../recommendation-list'
import ReactTooltip from 'react-tooltip'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import MergeType from '@material-ui/icons/MergeType'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import CodeEditor from '../code-editor'
import { MenuItem, } from '@trendmicro/react-dropdown'
import Dropdown from '../download-dropdown/dropdown'

const QueryForm = props => {
  const {
    queryText,
    recommendations,
    usedDatasets,
    datasetReferences,
    isQueryLoading,
    queryFailureMessage,
    isQueryDataAvailable,
    queryData,

    executeQuery,
    cancelQuery,
    setQueryText
  } = props

  const [localQueryText, setLocalQueryText] = useState(queryText)
  React.useEffect(() => {
    setLocalQueryText(queryText);
  }, [queryText])

  const updateReduxQueryText = e => {
    setQueryText(e.target.value)
    setLocalQueryText(e.target.value)
  }

  const submit = () => {
    executeQuery(localQueryText)
  }

  const cancel = () => {
    cancelQuery()
  }

  const textArea = <CodeEditor
    code={localQueryText}
    onBlur={updateReduxQueryText}
    data-testid='query-input'
  />
  const submitButton = <button data-testid="submit-query-button" className="action-button" disabled={isQueryLoading} onClick={submit}>Submit</button>
  const cancelButton = <button data-testid="cancel-query-button" className="action-button" disabled={!isQueryLoading} onClick={cancel}>Cancel</button>

  const showSuccessMessage = !queryFailureMessage && isQueryDataAvailable && !isQueryLoading
  const successMessage = showSuccessMessage && (
    <span data-testid='success-message' className='success-message'>
      Query successful
    </span>
  )

  const showFailureMessage = queryFailureMessage && !isQueryLoading
  const failureMessage = (
    showFailureMessage && <span data-testid='error-message' className='error-message'>
      {queryFailureMessage}
    </span>
  )

  const recommendationSection = () => {
    const toolTipText = 'These datasets have related fields or columns that may be suitable for joining in your query'
    if (!_.isEmpty(recommendations)) {
      return (
        <div className="recommendation-section link-list">
          <div className="title">
            <span>Recommendations</span>
            <ReactTooltip effect="solid" />
            <InfoOutlined className="info-icon" data-tip={toolTipText} />
          </div>
          <RecommendationList recommendations={recommendations} />
        </div>
      )
    }
  }

  const createDatasetLinks = (datasetIds) => {
    return datasetIds.map((datasetId) => {
      const dataset = datasetReferences[datasetId]
      if (!dataset) {
        return
      }
      return (
        <span className="dataset-reference" key={datasetId}><MergeType className="icon" /><Link target="_blank" to={`/dataset/${dataset.org}/${dataset.name}`}>{dataset.title}</Link></span>
      )
    });
  }

  const usedDatasetsSection = () => {
    const toolTipText = 'These datasets are used in the query. This list is regenerated whenever the visualization is saved.'
    if (!_.isEmpty(usedDatasets)) {
      return (
        <div className="link-list">
          <div className="title">
            <span>Used Datasets</span>
            <ReactTooltip effect="solid" />
            <InfoOutlined className="info-icon" data-tip={toolTipText} />
          </div>
          <div className="used-datasets-section">
            {createDatasetLinks(usedDatasets)}
          </div>
        </div>
      )
    }
  }

  let dataObj, data, filename, tempLink
  const queryDataDownloadLink = (fileType) => {
    dataObj = downloadLinkData(queryData, fileType)
    data = new Blob([dataObj], {type: fileType})
    filename = fileType == "text/csv" ? "query_results.csv" : "query_results.json"

    tempLink = document.createElement('a')
    tempLink.href = window.URL.createObjectURL(data)
    tempLink.setAttribute('download', filename)
    tempLink.click()
  }

  const downloadLinkData = (queryData, fileType) => {
    if(fileType == "text/csv") return queryDataToCSV(queryData)

    return JSON.stringify(queryData)
  }

  let keys, csv, row, rowValues
  const queryDataToCSV = (dataObj) => {
    if(dataObj == undefined || dataObj == null || dataObj == []) return ""

    row = dataObj[0]
    if(row == undefined || row == null) return ""

    keys = Object.keys(row)
    csv = keys.join(",") + "\n"
    dataObj.forEach((row) => {
      Object.values(row).forEach((colVal) => {
        if(colVal == null) {
          colVal = ""
        } else if(typeof colVal == 'object'){
          colVal = JSON.stringify(colVal)
          colVal = colVal.replaceAll("\"", "\"\"")
          colVal = `"${colVal}"`
        }

        csv += colVal + ","
      })

      csv += "\n"
    }) 

    return csv
  }

  return (
    <query-form>
      <div className="user-input">
        <div className="sql-section">
          <div className="sql-title">Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.</div>
          {textArea}
        </div>
        <div className="query-info">
          {recommendationSection()}
          {usedDatasetsSection()}
        </div>
      </div>
      <div className="query-form__btn-group">
        {submitButton}
        {cancelButton}
        {failureMessage}
        {successMessage}

        <Dropdown className="download-dropdown" disabled={isQueryLoading}>
          <Dropdown.Toggle title="Download Returned Results" style={{background: "#00aeef", color:  "#f7f7f7", border: "none", padding: "1rem"}}/>
          <Dropdown.MenuWrapper>
            <Dropdown.Menu>
              <MenuItem onClick={() => queryDataDownloadLink("text/csv")}>CSV</MenuItem>
              <MenuItem onClick={() => queryDataDownloadLink("application/json")}>JSON</MenuItem>
            </Dropdown.Menu>
          </Dropdown.MenuWrapper>
        </Dropdown>

        {isQueryLoading && <LoadingElement />}
      </div>
    </query-form>
  )
}

QueryForm.propTypes = {
  queryText: PropTypes.string,
  recommendations: PropTypes.array,
  queryFailureMessage: PropTypes.string,
  isQueryDataAvailable: PropTypes.bool,
  isQueryLoading: PropTypes.bool.isRequired,

  executeQuery: PropTypes.func.isRequired,
  cancelQuery: PropTypes.func.isRequired,
  setQueryText: PropTypes.func.isRequired
}

export default QueryForm
