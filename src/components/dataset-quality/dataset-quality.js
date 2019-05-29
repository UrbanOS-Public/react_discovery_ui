import { Component } from 'react'
import './dataset-quality.scss'
import CollapsableBox from  '../../components/collapsable-box'
import DetailToggleIcon from '../detail-toggle-icon';

export default class extends Component {

  streamingHeader() {
    return (
      this.props.completeness
      ? <div className="quality-header">
          <div className="completeness-score">
            {Math.round(this.props.completeness * 100)}%
          </div>
          <div>Dataset quality is a measure of the completeness of the dataset</div>
        </div>
      : <div />
    )
  }

  render() {
    return (
      <dataset-quality>
        <div className="foo" />
        <CollapsableBox title={"Dataset Quality"} headerHtml={this.streamingHeader()} bodyHtml={<div />} expanded={false} />
      </dataset-quality>
    )
  }
}
