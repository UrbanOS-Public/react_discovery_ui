import './streaming-api-doc.scss'
import { Collapse } from 'react-collapse';
import { Component } from 'react'
import DetailToggleIcon from '../detail-toggle-icon'
import CollapsableBox from  '../../components/collapsable-box'

export default class extends Component {

    streamingHeader() {
      return (
        <div>
          <div className='api-doc-header'>Websocket Streaming Example</div>
          <div>Access Operating System data through a websocket.</div>
        </div>
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
                              'wss://streams.smartcolumbusos.com/socket/websocket'
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
              <CollapsableBox headerHtml={this.streamingHeader()} bodyHtml={this.streamingBody()} expanded={this.props.expanded} />
            </streaming-api-doc>
        )
    }
}
