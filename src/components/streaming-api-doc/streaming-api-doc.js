import './streaming-api-doc.scss'
import { Collapse } from 'react-collapse';
import { Component } from 'react'
import DetailToggleIcon from '../detail-toggle-icon'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = { expanded: props.expanded || false };
    }

    toggleCollapsed() {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const dataset = this.props.dataset
        const systemName = dataset.organization.name + "__" + dataset.name

        if (!dataset) {
            return <div />
        }

        return (
            <streaming-api-doc>
                <div className='header-container' onClick={e => { this.toggleCollapsed() }} >
                    <div className='header-text-items'>
                        <div className='api-doc-header'>Websocket Streaming Example</div>
                        <div>
                            Access Operating System data through a websocket.
                        </div>
                    </div>
                    <DetailToggleIcon expanded={this.state.expanded} />
                </div>
                <Collapse isOpened={this.state.expanded}>
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
                    `}</code>
                        </div>
                    </div>
                </Collapse>
            </streaming-api-doc>
        )
    }
}