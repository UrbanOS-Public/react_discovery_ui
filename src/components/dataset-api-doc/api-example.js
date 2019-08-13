import './api-example.scss'
import Icon from '@material-ui/core/Icon'

export default ({ title, descriptionHtml, action, url, params, examples }) => {
  return (
    <api-example>
      <div className='example-container'>
        <div className='example-title'>{title}</div>
        {descriptionHtml}
        <div className='example-code'>
          <code className='example-element'>
            {action}:{' '}
            {url}
          </code>
        </div>
        {params && renderParameters(params)}
        {examples && renderExamples(examples, url)}
      </div>
    </api-example>
  )
}

function renderParameters(params) {
  return (
    <div>
      <div className='example-header'>Parameters</div>
      <div className='example-parameters'>
        <table className='parameter-table'>
          <thead>
            <tr>
              <th>Name</th>
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
      <td className='parameter-example'>{parameter.example}</td>
      <td>{parameter.description}</td>
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
  const copyToClipboard = (e) => {
    const textField = document.createElement('textarea');
    textField.innerText = example.curl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  return (
    <div className='example-body' key={index}>
      <div className='example-description'>
        {example.description}
      </div>
      <div className='example-code'>
        <code className='example-element'>{example.body}</code>
        <div className='example-element curl' onClick={copyToClipboard}>
          cURL
          <Icon className="copy-icon">
            filter_none
          </Icon>
          <div className='secret-curl-field'>{example.curl}</div>
        </div>
      </div>
    </div>
  )
}

function createCurlCommand(example, url) {
  return `curl -X POST '${url}' -d '${example.body}'`
}
