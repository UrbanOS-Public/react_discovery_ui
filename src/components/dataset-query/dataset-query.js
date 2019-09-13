import { useState, useEffect } from 'react'
import './dataset-query.scss'

const DatasetQuery = props => {
  const defaultText = `SELECT * FROM ${props.systemName}\nLIMIT 20000`
  const [queryText, setQueryTextRaw] = useState(defaultText)
  const submit = () => { props.queryDataset(queryText) }
  const setQueryText = (e) => setQueryTextRaw(e.target.value)

  const textArea = <textarea rows={5} type='text' value={queryText} onChange={setQueryText} className='query-input' />
  const submitButton = <button className='action-button' onClick={submit}>Submit</button>
  const errorMessage = <span className='error-message'>Query failure.  There may be a syntax issue.</span>

  useEffect(submit, [])

  return (
    <div className='dataset-query'>
      <p>
        Enter your SQL query below. For best performance, you should limit your results to no more than 20,000 rows.
      </p>
      {textArea}
      <span>
        {submitButton}
        {props.queryFailureMessage && errorMessage}
      </span>
    </div>
  )

}

export default DatasetQuery
