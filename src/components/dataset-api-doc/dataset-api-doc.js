import './dataset-api-doc.scss'
import CollapsableBox from '../../components/collapsable-box'
import ApiExample from './api-example'
import { getDefaultFormat } from '../../utils/file-type-utils'

const simpleApiParams = [
  {
    name: 'columns',
    default: '*',
    description:
      'A list of columns from the dataset to be included in the query.',
    example: 'column1,column2,column3'
  },
  {
    name: 'where',
    default: '',
    description:
      'A set of conditions to filter rows by. Multiple conditions can be added, separated by AND or OR.',
    example: "column1='a value' OR column1='another value'"
  },
  {
    name: 'groupBy',
    default: '',
    description:
      'A column (or comma-separated list of columns) to group the results by.',
    example: 'column1'
  },
  {
    name: 'orderBy',
    default: '',
    description:
      "A column (or comma separated list of columns) to order the results by and one of 'ASC' or 'DESC' to determine the direction of each.",
    example: 'column1 ASC, column2 DESC'
  },
  {
    name: 'limit',
    default: '',
    description:
      'A whole number limiting the total rows returned. The API does not guarantee the same list of rows every time when limited this way.',
    example: '200'
  },
  {
    name: '_format',
    default: 'CSV',
    description: 'The format of data returned by a query. ',
    example: 'json'
  }
]

const freestyleApiParams = [
  {
    name: '_format',
    default: 'CSV',
    description: 'The format of data returned by a query.',
    example: 'json'
  }
]

const apiHeaders = [
  {
    name: 'api_key',
    default: '',
    description: 'Include your unique api key as the value. You can generate your key by navigating to the “API Key” item on the “My Account” menu.',
    required: window.REQUIRE_API_KEY === 'true'
  }
]

function getFreestyleApiExamples(dataset) {
  return [
    {
      body: `SELECT * FROM ${dataset.systemName} LIMIT 200`,
      description: 'Get 200 rows with all columns of data from the dataset.'
    },
    {
      body: `SELECT ${dataset.schema[0].name} FROM ${dataset.systemName} WHERE ${dataset.schema[0].name} IS NOT NULL LIMIT 200`,
      description: `Get only the column ${dataset.schema[0].name} from the dataset where ${dataset.schema[0].name} contains data.`
    },
    {
      body: 'SELECT t1.example_column, t2.joined_column FROM example_dataset_one t1 INNER JOIN example_dataset_two t2 ON t1.example_id = t2.example_id LIMIT 200',
      description: 'Get rows from two example datasets where the example_id columns match. Get example_column from one and joined_column from the other.'
    }
  ]
}

function freestyleDescription() {
  return (
    <div>
      This query supports the full ANSI SQL syntax, and only selects from the tables specified in the query.<br />
      The query to run must be submitted as plain text in the body of the request.<br />
      Documentation can be found at:
      <ul>
        <li><a className="primary-color" href='https://en.wikipedia.org/wiki/SQL_syntax' target='_blank'>SQL Syntax (Wikipedia)</a></li>
        <li><a className="primary-color" href='https://www.w3schools.com/sql/sql_quickref.asp' target='_blank'>Quick Reference (W3 Schools)</a></li>
        <li><a className="primary-color" href='https://prestodb.github.io/docs/current/sql/select.html' target='_blank'>PrestoDB Specific Syntax</a></li>
      </ul>
    </div>
  )
}

function renderHeader() {
  return (
    <div>
      Access Operating System data with supported queries. All supported
      clauses follow standard ANSI SQL standards.
    </div>
  )
}

function renderExamples(dataset) {
  const format = getDefaultFormat(dataset)
  return (
    <div>
      <ApiExample
        title='Simple query'
        descriptionHtml={<><div>This query selects all columns from the dataset, limited to 200 rows returned.</div>
          <div>If this dataset is private, or the system is in "API Key Required" mode, you'll need to include your key in the value of the "api_key" header.</div>
          <div>Additional examples of API key usage are in the curl examples below.</div>
        </>}
        url={`${window.DISC_API_URL}/api/v1/organization/${dataset.organization.name}/dataset/${dataset.name}/query?limit=200&_format=${format}`}
        action='GET'
        params={simpleApiParams}
        headers={apiHeaders}
      />
      <ApiExample
        title='Freestyle query'
        descriptionHtml={freestyleDescription()}
        url={`${window.DISC_API_URL}/api/v1/query?_format=${format}`}
        action='POST'
        params={freestyleApiParams}
        examples={getFreestyleApiExamples(dataset)}
        headers={apiHeaders}
      />
    </div>
  )
}

export default ({ expanded, dataset }) => {
  return (
    <dataset-api-doc class='dataset-api-doc'>
      <CollapsableBox
        title='API Examples'
        headerHtml={renderHeader()}
        expanded={expanded}
      >
        {renderExamples(dataset)}
      </CollapsableBox>
    </dataset-api-doc>
  )
}
