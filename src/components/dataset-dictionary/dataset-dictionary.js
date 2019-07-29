import React, { Component } from 'react'
import './dataset-dictionary.scss'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DatasetSchema from '../dataset-schema';
import CollapsableBox from '../../components/collapsable-box'

export default class extends Component {
  render() {
    const { schema } = this.props
    if (!this.props.schema) {
      return <div />
    }


    return (
      <CollapsableBox title="Dataset Dictionary" expanded={false}>
        <DatasetSchema depth={0} schema={schema} />
      </CollapsableBox>
    )
  }
}
