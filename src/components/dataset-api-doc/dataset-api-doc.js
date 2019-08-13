import './dataset-api-doc.scss'
import CollapsableBox from '../../components/collapsable-box'
import ApiExample from './api-example'

const formats = {
  gtfs: 'json'
}

const simpleApiParams = [
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

const freestyleApiParams = [
  {
    name: '_format',
    description: 'The format of data returned by a query. Optional. Defaults to CSV.',
    example: 'json'
  },
  {
    name: 'body',
    description: 'The SQL query to be run by the request. Required. No default. Must be sent as plain text in the body of the request.',
    example: 'select * from example_table'
  }
]

function getFreestyleApiExamples(dataset) {
  return [
    {
      body: `select * from ${dataset.systemName} limit 200`,
      description: 'Get 200 records with all fields of data from the dataset.'
    },
    {
      body: `select ${dataset.schema[0].name} from ${dataset.systemName} where ${dataset.schema[0].name} <> null limit 200`,
      description: `Get only the field ${dataset.schema[0].name} from the dataset where ${dataset.schema[0].name} contains data ("is not equal to null").`
    },
    {
      body: `select t1.example_field, t2.joined_field from example_dataset_one t1 join example_dataset_two t2 on t1.example_id = t2.example_id limit 200`,
      description: `Return records from two example datasets where the example_id fields match. Get example_field from one and joined_field from the other.`
    }
  ]
}

function freestyleDescription() {
  return (
    <div>
      This query supports the full SQL syntax, and only selects from the tables specified in the query.<br />
      Queries use ANSI SQL syntax. Documentation can be found at:
      <ul>
        <li><a href='https://en.wikipedia.org/wiki/SQL_syntax'>SQL Syntax (Wikipedia)</a></li>
        <li><a href='https://www.w3schools.com/sql/sql_quickref.asp'>Quick Reference (W3 Schools)</a></li>
        <li><a href='https://prestodb.github.io/docs/current/sql.html'>PrestoDB Specific Syntax</a></li>
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
  return (
    <div>
      <ApiExample
        title={'Simple restricted query'}
        descriptionHtml={<div>This query selects from all available records from a specific dataset, limited to 200 records returned.</div>}
        url={`${window.API_HOST}/api/v1/organization/${dataset.organization.name}/dataset/${dataset.name}/query?limit=200&_format=${formats[dataset.sourceFormat] || dataset.sourceFormat}`}
        action='GET'
        params={simpleApiParams}
      />
      <ApiExample
        title={'Freestyle query'}
        descriptionHtml={freestyleDescription()}
        url={`${window.API_HOST}/api/v1/query?_format=${formats[dataset.sourceFormat] || dataset.sourceFormat}`}
        action='POST'
        params={freestyleApiParams}
        examples={getFreestyleApiExamples(dataset)}
      />
    </div>
  )
}

export default ({ expanded, dataset }) => {
  return (
    <dataset-api-doc >
      <CollapsableBox
        title="API Example"
        headerHtml={renderHeader()}
        expanded={expanded}>
        {renderExamples(dataset)}
      </CollapsableBox>
    </dataset-api-doc >
  )
}
