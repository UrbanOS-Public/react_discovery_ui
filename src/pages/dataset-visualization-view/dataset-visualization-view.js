import { Component } from 'react'
import plotly from 'plotly.js/dist/plotly';
import ChartVisualization from '../../components/visualizations/chart/chart-visualization';

const config = { editable: true };

export default class extends Component {
  componentDidMount() {
    this.props.queryDataset(this.props.match.params.organization_name, this.props.match.params.dataset_name, 'json', 10000)
  }

  componentWillUnmount() {
    // clear data
  }

  render() {
    return (
      <dataset-visualization>
        <ChartVisualization plotly={plotly} dataSources={this.props.dataSources} />
      </dataset-visualization>
    )
  }
}
