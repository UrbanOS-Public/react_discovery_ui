import PlotlyEditor, { DefaultEditor } from 'react-chart-editor'
import 'react-chart-editor/lib/react-chart-editor.ie.css'
import './chart-visualization.css'
import { dereference } from 'react-chart-editor/lib'
import plotly from 'plotly.js/dist/plotly'
import { Component } from 'react'
import { isEqual, cloneDeep } from 'lodash'

const getDataSourceOptions = dataSources => {
  return Object.keys(dataSources).map(name => ({
    value: name,
    label: name,
  }));
}

export default class ChartVisualization extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], layout: {}, frames: [] }
  }

  render() {
    return (
      <chart-visualization>
          <PlotlyEditor
            data={this.state.data}
            layout={this.state.layout}
            frames={this.state.frames}
            dataSources={this.props.dataSources}
            dataSourceOptions={getDataSourceOptions(this.props.dataSources)}
            plotly={plotly}
            onUpdate={(data, layout, frames) => this.setState({ data, layout, frames })}
            useResizeHandler
            advancedTraceTypeSelector
            config={{ mapboxAccessToken: window.MAPBOX_ACCESS_TOKEN }}
          >
            <DefaultEditor logoSrc={window.LOGO_URL} />
          </PlotlyEditor>
      </chart-visualization>
    )
  }
}
