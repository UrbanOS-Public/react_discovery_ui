import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import './geojson-visualization.scss'
import LoadingElement from '../../../components/generic-elements/loading-element'
import { GeoJsonUtils } from '../../../utils';

const ohioBoundingBox = [-84.811309, 38.483320, -80.541532, 41.971108]

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
      return (<div className='map-placeholder'><LoadingElement className='spinner' /></div>)
    }
    // const features = geoJsonData.features.filter(feature => {
    //   return feature.geometry.type == "MultiLineString"
    // })
    // const newGeoJsonData = Object.assign({}, geoJsonData, {features})
    const bbox = geoJsonData ? GeoJsonUtils.determineBoundingBox(geoJsonData) : ohioBoundingBox
    return (
      <Map bounds={this.formatBboxToLeafletBounds(bbox)}>
        {/* <Map> */}
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
