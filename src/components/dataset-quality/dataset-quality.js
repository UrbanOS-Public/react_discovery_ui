import { Component } from 'react'
import './dataset-quality.scss'
import CollapsableBox from '../../components/collapsable-box'
import DetailToggleIcon from '../detail-toggle-icon';

export default class extends Component {

  streamingHeader() {
    if (!this.props.completeness) {
      return (<div />)
    }

    return (
      <div className="quality-header">
        <div className="completeness-score">
          {Math.round(this.props.completeness * 100)}%
        </div>
        <div className="completeness-description">The percentage of relevant non-empty fields contained in the dataset.</div>
      </div>
    )
  }

  render() {
    return (
      <dataset-quality>
        <CollapsableBox title="Completeness" headerHtml={this.streamingHeader()} expanded={false}>
          <div />
        </CollapsableBox>
      </dataset-quality>
    )
  }
}
