export const Selectors = {
  errorText: '[data-testid=error-text]'
}

export const Routes = {
  info: {
    method: 'GET',
    url: '/sockjs-node/*',
    response: 'fixture:info.json'
  },
  user: {
    method: 'GET',
    url: '/api/v1/visualization',
    response: []
  }
}
