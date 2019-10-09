const mock = {
  get: jest.fn(() => Promise.resolve({ data: { metadata: { totalDatasets: 12 }, results: [] }, status: 200 })),
  post: jest.fn()
}

mock.create = jest.fn(config => ({...mock, defaults: config}))

export default mock
