import PlotlyEditor from 'react-chart-editor'
import 'react-chart-editor/lib/react-chart-editor.ie.css'
import plotly from 'plotly.js/dist/plotly'
import { Component } from 'react'

const hasDataSources = dataSources => {
  return dataSources && Object.keys(dataSources).length > 0
}

const getDataSourceOptions = dataSources => {
  return Object.keys(dataSources).map(name => ({
    value: name,
    label: name,
  }));
}

const config = { editable: true };

export default class ChartVisualization extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], layout: {}, frames: [] }
  }

  // TODO: test properties are set as expected
  render() {
    return (
      <chart-visualization>
        {
          hasDataSources(this.props.dataSources) &&
          <PlotlyEditor
            data={this.state.data}
            layout={this.state.layout}
            config={config}
            frames={this.state.frames}
            dataSources={this.props.dataSources}
            dataSourceOptions={getDataSourceOptions(this.props.dataSources)}
            plotly={plotly}
            onUpdate={(data, layout, frames) => this.setState({ data, layout, frames })}
            useResizeHandler
            debug
            advancedTraceTypeSelector
          />
        }
      </chart-visualization>
    )
  }
}
