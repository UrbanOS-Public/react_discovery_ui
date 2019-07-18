import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import './geojson-visualization.scss'

export default class GeoJSONVisualization extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.downloadDataset(this.props.datasetId, this.props.format)
  }

  render() {
    const zoom = 7
    const centerOfOhio = [40.4173, -82.9071]
    return (
      <Map center={centerOfOhio} zoom={zoom}>
        <TileLayer url={`https://{s}.tiles.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}{r}?access_token=${window.MAPBOX_API_KEY}`} />
        {this.props.downloadedDataset && <GeoJSON data={this.props.downloadedDataset} /> }
      </Map>
    )
  }

  calculateCenterFromBbox(bbox) {
    const [xmin, ymin, xmax, ymax] = bbox
    const x = (xmin + xmax) / 2
    const y = (ymin + ymax) / 2
    return [y, x]
  }
}