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
            Example using <a href='https://github.com/vi/websocat'>Websocat</a> on a terminal
            </div>
          <div className='example-code'>
            <code>
              <div>{`websocat wss://streams.${window.BASE_URL}/socket/websocket`}</div>
              <div>{`'{"topic": "streaming:${systemName}","event":"phx_join","payload":{},"ref":"1"}'`}</div>
            </code>
          </div>
          <div className='example-header'>
              Phoenix Channels clients
          </div>
          <div>
            For application development, look at the <a href="https://www.npmjs.com/package/phoenix">official Phoenix Javascript library</a>, or one of the <a href="https://hexdocs.pm/phoenix/channels.html#client-libraries">other client libraries</a>
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
