import './api-example.scss'
import FilterNoneIcon from '@material-ui/icons/FilterNone'

const defaultHeaders = [
  {
    name: 'api_key',
    default: '',
    description: 'Include your unique api key as the value. You can generate your key by navigating to the “API Key” item on the “My Account” menu.',
    required: false
  }
]

export default ({ title, descriptionHtml, action, url, params, examples, headers = defaultHeaders }) => {
  console.log(headers)
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
        {renderHeaders(headers)}
        {examples && renderExamples(examples, url)}
      </div>
    </api-example>
  )
}

function renderParameters(params) {
  return (
    <div>
      <div className='example-header'>Optional Parameters</div>
      <div className='example-parameters'>
        <table className='example-table'>
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

function renderParameter(parameter) {
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



function renderHeaders(headers) {
  return (
    <div>
      <div className='example-header'>Headers</div>
      <div>
        <table className='example-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Required</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {headers.map(renderHeader)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function renderHeader(header) {
  return (
    <tr key={`${header.name}`}>
      <td>
        <span className='pill'>{header.name}</span>
      </td>
      <td className="required-marker">{header.required ? "Yes" : "No"}</td>
      <td>{header.default}</td>
      <td>{header.description}</td>
    </tr>
  )
}

function renderExamples(examples, url) {
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

function renderExample(example, index) {
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
          onKeyDownCapture={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault() && copyToClipboard(event) } }}
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

function createCurlCommand(example, url) {
  return `curl -X POST '${url}' -H 'Content-Type: text/plain' -H 'api_key: USER_API_KEY_HERE' -d '${example.body}'`
}
