export default {
  get: jest.fn(() => Promise.resolve({ data: { metadata: { totalDatasets: 12 }, results: [] }, status: 200 }))
}
