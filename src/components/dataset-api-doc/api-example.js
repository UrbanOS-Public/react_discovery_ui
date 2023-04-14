import './api-example.scss'
import FilterNoneIcon from '@material-ui/icons/FilterNone'

export default ({ title, descriptionHtml, action, url, params, examples }) => {
  return (
    <api-example>
      <div className='example-container'>
        <div className='example-title'>{title}</div>
        {descriptionHtml}
        <div className='example-code'>
          <code data-testid={`${title}-api-example`} className='example-element'>
            {`${action}: ${url}`}
          </code>
        </div>
        {params && renderParameters(params)}
        {examples && renderExamples(examples, url)}
      </div>
    </api-example>
  )
}

function renderParameters (params) {
  return (
    <div>
      <div className='example-header'>Optional Parameters</div>
      <div className='example-parameters'>
        <table className='parameter-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Default</th>
              <th>Example</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map(renderParameter)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function renderParameter (parameter) {
  return (
    <tr key={`${parameter.name}`}>
      <td>
        <span className='pill'>{parameter.name}</span>
      </td>
      <td>{parameter.default}</td>
      <td className='parameter-example'>{parameter.example}</td>
      <td>{parameter.description}</td>
    </tr>
  )
}

function renderExamples (examples, url) {
  examples = examples.map(example => {
    example.curl = createCurlCommand(example, url)
    return example
  })
  return (
    <div>
      <div className='example-header'>Example Bodies</div>
      {examples.map(renderExample)}
    </div>
  )
}

function renderExample (example, index) {
  const copyToClipboard = (event) => {
    const textField = document.createElement('textarea')
    textField.innerText = example.curl
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    event.target.focus();
  }

  return (
    <div className='example-body' key={index}>
      <div className='example-description'>
        {example.description}
      </div>
      <div className='example-code'>
        <code data-testid={`curl-example-${index}`} className='example-element'>{example.body}</code>
        <div
          className='example-element curl'
          onClick={(event) => copyToClipboard(event)}
          onKeyDownCapture={(event) => { if (event.key === ' ' || event.key === 'Enter') { copyToClipboard(event) } }}
          role='button'
          tabIndex='0'
          aria-label={`cURL ${index}`}
        >
          cURL
          <FilterNoneIcon className='copy-FilterNoneIcon'>
            filter_none
          </FilterNoneIcon>
          <div className='secret-curl-field'>{example.curl}</div>
        </div>
      </div>
    </div>
  )
}

function createCurlCommand (example, url) {
  return `curl -X POST '${url}' -H 'Content-Type: text/plain' -H 'api_key: USER_API_KEY_HERE' -d '${example.body}'`
}
