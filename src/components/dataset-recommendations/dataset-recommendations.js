import './dataset-recommendations.scss'
import { Collapse } from 'react-collapse';
import { Component } from 'react'


export default (props) => {
  return (
    <dataset-recommendations>
      <ul>
        {props.recommendations.map(rc => <li key={rc.id}>{JSON.stringify(rc)}</li>)}
      </ul>
    </dataset-recommendations>
  )
}
