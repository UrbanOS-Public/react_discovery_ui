import folderSVG from '../../../assets/plus.svg'
import InlineSVG from 'react-svg-inline'

export default ({className}) => {
    return (<span className={className}><InlineSVG className='plus-icon' svg={folderSVG} height='1.6rem' width='1.6rem' accessibilityDesc='Plus Icon' /></span>)
}
