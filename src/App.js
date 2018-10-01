import './App.scss'
import Title from './components/title'
import Count from './components/count'
import { PlusButton, MinusButton } from './components/button'

export default () => (
  <main-app-element>
    <Title title='Your Current Count (in redux!)' />
    <Count />
    <div className='buttons-container'>
      <MinusButton />
      <PlusButton />
    </div>
  </main-app-element>
)
