import folderSVG from '../../../assets/folder_icon.svg'
import InlineSVG from 'react-svg-inline'

export default ({className}) => {
    return (<span className={className}><InlineSVG className='folder-icon' svg={folderSVG} height='21px' width='21px' accessibilityDesc='Folder Icon' /></span>)
}
