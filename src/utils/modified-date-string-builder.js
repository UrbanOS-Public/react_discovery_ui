import moment from 'moment'

const NO_DATE_MESSAGE = 'Date not provided'

const createDateString = dataset => {
    if (dataset.sourceType == "remote") {
        return "Updates to remote datasets are not tracked"
    } else if (dataset.sourceType == "ingest") {
        return buildDate(dataset.modified, 'MMM D, YYYY') + ' (Last updated by provider)'
    } else if (dataset.sourceType == "stream") {
        return buildDate(dataset.lastUpdatedDate, 'MMM D, YYYY h:mm A') + ' (Last Ingested)'
    } else {
        return NO_DATE_MESSAGE
    }
}

const buildDate = (date, format) => {
    if (!date) return NO_DATE_MESSAGE
    return moment.utc(date).format(format)
}

export default { createDateString }
