import './loading-element.scss'
import loadingIcon from '../../assets/loadingicon.svg'

const LoadingElement = () => {
  return (
    <loading-element>
      <div className='loading-container'>
        <img src={loadingIcon} className={'loader'} alt={'Loading...'} />
      </div>
    </loading-element>
  )
}

export default LoadingElement
