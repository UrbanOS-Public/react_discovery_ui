import './api-example.scss'

export default ({ title, descriptionHtml, action, url, params, examples }) => {
  return (
    <api-example>
      <div className='example-container'>
        <div className='example-title'>{title}</div>
        {descriptionHtml}
        <div className='example-code'>
          <code>
            {action}:{' '}
            {url}
          </code>
        </div>
        {params && renderParameters(params)}
        {examples && renderExamples(examples)}
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

function renderExamples(examples) {
  return (
    <div>
      <div className='example-header'>Example Bodies</div>
      {examples.map(renderExample)}
    </div>
  )
}

function renderExample(example, index) {
  return (
    <div className='example-body' key={index}>
      <div className='example-description'>
        {example.description}
      </div>
      <div className='example-code'>
        <code>{example.body}</code>
      </div>
    </div>
  )
}
