import './dataset-api-doc.scss'
import { Collapse } from 'react-collapse';
import { Component } from 'react'
import DetailToggleIcon from '../detail-toggle-icon';
import CollapsableBox from '../../components/collapsable-box'

export default class extends Component {

  streamingHeader() {
    return (
      <div>
        Access Operating System data with supported queries. All supported
        clauses follow standard ANSI SQL standards.
      </div>
    )
  }

  streamingBody() {
    const dataset = this.props.dataset

    const formats = {
      gtfs: 'json'
    }

    return (
      <div>
        <div className='example-container'>
          <div className='example-header'>
            Example: Select all, limited to 200 records
          </div>
          <div className='example-code'>
            <code>
              GET:{' '}
              {`${window.API_HOST}/api/v1/organization/${dataset.organization.name}/dataset/${dataset.name}/query?limit=200&_format=${formats[dataset.sourceFormat] || dataset.sourceFormat}`}
            </code>
          </div>
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
                {apiParams.map(i => {
                  return [
                    <tr key={`${i.name}`}>
                      <td>
                        <span className='pill'>{i.name}</span>
                      </td>
                      <td className='parameter-example'>{i.example}</td>
                      <td>{i.description}</td>
                    </tr>
                  ]
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <dataset-api-doc >
        <CollapsableBox
          title="API Example"
          headerHtml={this.streamingHeader()}
          expanded={this.props.expanded}>
          {this.streamingBody()}
        </CollapsableBox>
      </dataset-api-doc >
    )
  }
}


const apiParams = [
  {
    name: 'columns',
    description:
      'A list of columns from the dataset to be included in the query. Defaults to all columns.',
    example: 'column1,column2,column3'
  },
  {
    name: 'where',
    description:
      'A set of conditions to filter rows by. Multiple conditions can be added, separated by AND or OR',
    example: "column1='a value' OR column1='another value'"
  },
  {
    name: 'orderBy',
    description:
      "A column (or comma separated list of columns) to order the results by and one of 'asc' or 'desc' to determine the direction of each.",
    example: 'column1 asc, column2 desc'
  },
  {
    name: 'limit',
    description:
      'A whole number limiting the total rows returned. The API does not guarantee the same list of rows every time when limited this way.',
    example: '100'
  },
  {
    name: 'groupBy',
    description:
      'A column (or space-separated list of columns) to group the results by.',
    example: "column1='a value'"
  },
  {
    name: '_format',
    description: 'The format of data returned by a query. Optional. Defaults to CSV.',
    example: 'json'
  }
]
