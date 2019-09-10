import { ModifiedDateStringBuilder } from './'

describe('create date string', () => {


  it('returns explanation for remote datasets', () => {
    const dataset = {
      sourceType: "remote",
      modified: "123",
      lastUpdatedDate: "456"
    }
    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Updates to remote datasets are not tracked")
  })

  it('returns explanation for ingest datasets with null date value', () => {
    const dataset = {
      sourceType: "ingest",
      modified: null,
      lastUpdatedDate: "yesterday"
    }
    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Date not provided (Last updated by provider)")
  })

  it('returns explanation for ingest datasets with empty date value', () => {
    const dataset = {
      sourceType: "ingest",
      modified: "",
      lastUpdatedDate: "yesterday"
    }
    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Date not provided (Last updated by provider)")
  })

  it('returns explanation for streaming datasets with empty date value', () => {
    const dataset = {
      sourceType: "stream",
      modified: "tomorrow",
      lastUpdatedDate: null
    }
    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Date not provided (Last Ingested)")
  })

  it('returns modified date as DATE TIME (Last ingested) for streaming datasets', () => {
    const dataset = {
      sourceType: "stream",
      modified: "tomorrow",
      lastUpdatedDate: "2019-09-06T20:06:59.367752Z"
    }
    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Sep 6, 2019 8:06 PM (Last Ingested)")
  })

  it('returns modified date as DATE (Last updated by provider) for ingest datasets', () => {
    const dataset = {
      sourceType: "ingest",
      modified: "2019-08-06T20:06:59.367752Z",
      lastUpdatedDate: "never"
    }
    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Aug 6, 2019 (Last updated by provider)")
  })

  it('return update not provided message for fallthrough', () => {
    const dataset = {
      sourceType: "no good",
      modified: "2019-08-06T20:06:59.367752Z",
      lastUpdatedDate: "never"
    }

    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Date not provided")
  })

  it('returns invalid date message when date parsing fails', () => {
    const dataset = {
      sourceType: "ingest",
      modified: "2019-08-06TImNotADateHAHA20:06:59.367752Z",
      lastUpdatedDate: "never"
    }

    const result = ModifiedDateStringBuilder.createDateString(dataset)

    expect(result).toEqual("Invalid date (Last updated by provider)")
  })


})

