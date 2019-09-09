import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import './geojson-visualization.scss'
import "!style-loader!css-loader!leaflet/dist/leaflet.css"
import LoadingElement from '../../../components/generic-elements/loading-element'
import { GeoJsonUtils } from '../../../utils';
import ErrorComponent from '../../../components/generic-elements/error-component'
import Checkbox from '../../../components/generic-elements/checkbox'

const ohioBBox = [-84.811309, 38.483320, -80.541532, 41.971108]

export default class GeoJSONVisualization extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showFullMap: false }
  }

  componentDidMount() {
    this.props.downloadDataset(this.props.datasetId, this.props.format)
    this.props.previewDataset(this.props.datasetId, this.props.format)
  }

  onMapToggleClick() {
    this.setState({
      showFullMap: !this.state.showFullMap
    })
  }

  isMapToggleDisabled() {
    const downloaded = this.props.downloadedGeoJsonData
    const previewed = this.props.previewedGeoJsonData
    if (previewed && downloaded) {
      return previewed.features.length === downloaded.features.length
    } else {
      return true
    }
  }

  formatBboxToLeafletBounds(bbox) {
    const [xmin, ymin, xmax, ymax] = bbox
    return [[ymin, xmin], [ymax, xmax]]
  }

  renderMap(geoJsonData, source, isHidden) {
    if (geoJsonData) {
      let bBox = GeoJsonUtils.determineBBox(geoJsonData)
      bBox = GeoJsonUtils.isValidBBox(bBox) ? bBox : ohioBBox

      return (
        <div className={isHidden ? 'hidden' : ''} test-id={`${source}-map`}>
          <Map bounds={this.formatBboxToLeafletBounds(bBox)}>
            <TileLayer url={window.STREETS_TILE_LAYER_URL} className='geo-json' />
            <GeoJSON data={geoJsonData} className='geo-json' />
          </Map>
        </div>
      )
    }
    return (<div />)
  }

  renderMapOrLoading() {
    const isLoading = !this.props.previewedGeoJsonData && !this.props.downloadedGeoJsonData

    if (isLoading) {
      return (
        <div className='map-placeholder'>
          <LoadingElement className='spinner' />
        </div>)
    } else {
      return (
        <div>
          {this.renderMap(this.props.previewedGeoJsonData, "preview", this.state.showFullMap)}
          {this.renderMap(this.props.downloadedGeoJsonData, "downloaded", !this.state.showFullMap)}
        </div>
      )
    }
  }

  render() {
    if (this.props.downloadedDatasetError) {
      return (
        <ErrorComponent errorText={'Unable to load GeoJson Data'} />
      )
    }

    return (
      <div>
        <Checkbox
          clickHandler={() => this.onMapToggleClick()}
          text="Show Full Dataset"
          selected={this.state.showFullMap}
          disabled={this.isMapToggleDisabled()} />
        {this.renderMapOrLoading()}
      </div>
    )
  }
}
