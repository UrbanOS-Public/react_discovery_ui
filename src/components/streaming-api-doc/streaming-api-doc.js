import './streaming-api-doc.scss'
import { Component } from 'react'
import CollapsableBox from '../../components/collapsable-box'

export default class extends Component {

  streamingHeader() {
    return (
      <div>Access Operating System data through a websocket.</div>
    )
  }

  streamingBody() {
    const dataset = this.props.dataset
    const systemName = dataset.organization.name + "__" + dataset.name

    return (
      <div>
        <div className='example-container'>
          <div className='example-header'>
            Example using <a href='https://github.com/esphen/wsta'>WSTA</a> on a terminal
            </div>
          <div className='example-code'>
            <code>{`
                              wsta -I --ping 50 --ping-msg
                              '{"topic": "phoenix","event":"heartbeat","payload":{},"ref":"1"}'
                              'wss://streams.${window.BASE_URL}/socket/websocket'
                              '{"topic": "streaming:${systemName}","event":"phx_join","payload":{},"ref":"1"}'
                          `}
            </code>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.dataset) {
      return <streaming-api-doc />
    }

    return (
      <streaming-api-doc>
        <CollapsableBox title="Websocket Streaming Example" headerHtml={this.streamingHeader()} expanded={this.props.expanded}>
          {this.streamingBody()}
        </CollapsableBox>
      </streaming-api-doc>
    )
  }
}
