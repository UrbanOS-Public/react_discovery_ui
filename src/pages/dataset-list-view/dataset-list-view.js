import './dataset-list-view.scss'
import { Component } from 'react'
import DatasetCard from '../../components/data-card'
import ErrorComponent from '../../components/error-component'
import LoadingElement from '../../components/loading-element'

export default class extends Component {
  componentDidMount () {
    this.props.retrieveDataset()
  }

  isLoading () {
    return ((!this.props.datasets || this.props.datasets.length === 0))
  }

  generateErrorComponent () {
    let errorText = 'We were unable to fetch the datasets, please refresh the page to try again'
    return <ErrorComponent errorText={errorText} />
  }
  generateLoadingComponent () {
    return <LoadingElement />
  }
  generateDataCards () {
    return this.props.datasets.map((item) =>
      <DatasetCard key={item.id} thingy={item.id} title={item.title} description={item.description} fileTypes={item.fileTypes} />
    )
  }

  composeCardsElement () {
    return this.isLoading() ? this.generateLoadingComponent() : this.generateDataCards()
  }
  composeComponent () {
    return this.props.displayNetworkError ? this.generateErrorComponent() : this.composeCardsElement()
  }

  render () {
    let cardsList = this.composeComponent()
    return (
      <dataset-list-view>
        {cardsList}
      </dataset-list-view>
    )
  }
}
