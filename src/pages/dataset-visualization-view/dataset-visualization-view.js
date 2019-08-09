import { Component } from 'react'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'

export default class extends Component {
  componentDidMount() {
    const { organization_name, dataset_name } = this.props.match.params
    this.props.queryDataset(organization_name, dataset_name, 'json', 10000)
  }

  render() {
    return (
      <dataset-visualization>
        <ChartVisualization dataSources={this.props.dataSources} />
      </dataset-visualization>
    )
  }
}
