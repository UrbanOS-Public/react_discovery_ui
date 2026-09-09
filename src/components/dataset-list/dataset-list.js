import DatasetCard from '../data-card'
import './dataset-list.scss'

const createDatasetCard = dataset => {
  return <DatasetCard key={dataset.id} dataset={dataset} />
}

const DatasetList = ({ datasets = [] }) => {
  return (
    <dataset-list data-testid='dataset-list'>
      {datasets.map(createDatasetCard) || <div />}
    </dataset-list>
  )
}

export default DatasetList;
