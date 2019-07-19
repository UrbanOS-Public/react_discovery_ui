import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import './geojson-visualization.scss'

const ohioBoundingBox = [ -84.811309, 38.483320, -80.541532, 41.971108]

export default class GeoJSONVisualization extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.downloadDataset(this.props.datasetId, this.props.format)
  }

  render() {
    const geoJsonData = this.props.geoJsonData
    const bbox = geoJsonData ? this.determineBbox(geoJsonData) : ohioBoundingBox
    return (
      <Map bounds={ this.formatBboxToLeafletBounds(bbox) }>
        <TileLayer url={window.STREETS_TILE_LAYER_URL} />
        {geoJsonData && <GeoJSON data={geoJsonData} />}
      </Map>
    )
  }

  determineBbox(geoJsonData) {
    return geoJsonData.bbox ? geoJsonData.bbox : this.calculateBbox(geoJsonData)
  }

  calculateBbox(geoJsonData) {
    let minLat, minLong, maxLat, maxLong
    minLat = minLong = 1000
    maxLat = maxLong = -1000

    geoJsonData.features.forEach((feature) => {
      feature.geometry.coordinates.forEach((coordinates) => {
        coordinates.forEach((coordinate) => {
          const long = coordinate[0]
          const lat = coordinate[1]

          minLat = lat < minLat ? lat : minLat
          maxLat = lat > maxLat ? lat : maxLat
          minLong = long < minLong ? long : minLong
          maxLong = long > maxLong ? long : maxLong
        })
      })
    })
    return [minLong, minLat, maxLong, maxLat]
  }

  formatBboxToLeafletBounds(bbox) {
    const [xmin, ymin, xmax, ymax] = bbox
    return [[ymin, xmin], [ymax, xmax]]
  }
}