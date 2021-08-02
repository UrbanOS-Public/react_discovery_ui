import {DateTime} from 'luxon';

const NO_DATE_MESSAGE = "Date not provided";

const createDateString = dataset => {
  switch (dataset.sourceType) {
    case "remote":
      return "Updates to remote datasets are not tracked";
    case "ingest":
      return (
        buildDate(dataset.modified, DateTime.DATE_MED) +
        " (Last updated by provider)"
      );
    case "stream":
      return (
        buildDate(dataset.lastUpdatedDate, DateTime.DATETIME_MED) +
        " (Last Ingested)"
      );
    default:
      return NO_DATE_MESSAGE;
  }
};

const buildDate = (date, format) => {
  if (!date) return NO_DATE_MESSAGE;
  return DateTime.fromISO(date).toLocaleString(format)
};

export default { createDateString };
