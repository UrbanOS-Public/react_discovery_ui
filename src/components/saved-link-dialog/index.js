const AutoAnchoringPopover = (prop) => {
  return (
    <Popover
    open={isSavedDialogOpen}
    onClose={() => { setDialogOpen(false) }}
    anchorEl={currentDialogAnchorElement}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    classes={{ paper: 'visualization-view-popover' }}
  >
    <div className='saved-link-dialog'>
      <GeneratedLink
        path={routes.visualizationView}
        params={{ id }}
        className="link-button" />
    </div>
  </Popover>
  )
}
export default SavedLinkDialog