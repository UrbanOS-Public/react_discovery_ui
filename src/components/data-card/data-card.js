import { Component } from 'react'
import './data-card.scss'

export default class extends Component {
  fileTypes () {
    return this.props.fileTypes.map(fileType => <span key={fileType} className='file-type'>{fileType} </span>)
  }

  render () {
    let fileTypes = this.fileTypes()
    return (
      <data-card>
        <div className='datacard-container'>
          <div className='title'>{this.props.title}</div>
          <div className='description'>{this.props.description}</div>
          <div className='file-types'>FILE TYPE: {fileTypes} </div>
        </div>
      </data-card>
    )
  }
}
