import FolderSVG from '../../../assets/folder_icon.svg'

export default ({ className, accessibilityDesc = 'Folder Icon' }) => {
  return (<span className={className}><FolderSVG className='folder-icon' height='1.6rem' width='1.6rem' accessibilityDesc={accessibilityDesc} /></span>)
}
