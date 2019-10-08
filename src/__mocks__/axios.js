export default {
  create: jest.fn((config) => ({defaults: config})),
  get: jest.fn(() => Promise.resolve({ data: { metadata: { totalDatasets: 12 }, results: [] }, status: 200 })),
  post: jest.fn()
}
