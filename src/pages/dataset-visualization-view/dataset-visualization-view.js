import { Component } from 'react'

import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import BackButton from '../../components/generic-elements/back-button'

import routes from '../../routes';

export default class extends Component {
  componentDidMount() {
    const { organization_name, dataset_name } = this.props.match.params
    this.props.queryDataset(organization_name, dataset_name, 'json', 10000)
  }

  render() {
    return (
      <dataset-visualization>
        <BackButton path={routes.datasetView} params={this.props.match.params}>Back to Dataset</BackButton>
        <ChartVisualization dataSources={this.props.dataSources} />
      </dataset-visualization>
    )
  }
}
