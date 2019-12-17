import folderSVG from '../../../assets/folder_icon.svg'
import InlineSVG from 'react-svg-inline'

export default ({className}) => {
    return (<span className={className}><InlineSVG className='folder-icon' svg={folderSVG} height='1.6rem' width='1.6rem' accessibilityDesc='Folder Icon' /></span>)
}
