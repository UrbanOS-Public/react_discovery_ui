import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import './geojson-visualization.scss'
import LoadingElement from '../../../components/generic-elements/loading-element'
import { GeoJsonUtils } from '../../../utils';

const ohioBBox = [-84.811309, 38.483320, -80.541532, 41.971108]

export default class GeoJSONVisualization extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.downloadDataset(this.props.datasetId, this.props.format)
  }

  render() {
    const geoJsonData = this.props.geoJsonData
    if (!geoJsonData) {
      return <div className='map-placeholder'><LoadingElement className='spinner' /></div>
    }
    let bBox = GeoJsonUtils.determineBBox(geoJsonData)
    bBox = GeoJsonUtils.isValidBBox(bBox) ? bBox : ohioBBox
    return (
      <Map bounds={this.formatBboxToLeafletBounds(bBox)}>
        <TileLayer url={window.STREETS_TILE_LAYER_URL} className='geo-json' />
        <GeoJSON data={geoJsonData} className='geo-json' />
      </Map>
    )
  }

  formatBboxToLeafletBounds(bbox) {
    const [xmin, ymin, xmax, ymax] = bbox
    return [[ymin, xmin], [ymax, xmax]]
  }
}
