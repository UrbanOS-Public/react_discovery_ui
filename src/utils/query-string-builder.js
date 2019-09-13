import qs from 'qs'
import _ from 'lodash'

const createTagFilterQueryString = (tags) => createFilterQueryString('tags', tags)
const createOrganizationFilterQueryString = (organization) => createFilterQueryString('organization', organization)
const createFilterQueryString = (attributeName, attributeValue) => createQueryString({ [attributeName]: _.castArray(attributeValue) })

function createQueryString(facets, searchCriteria, sort, apiAccessible) {
  return qs.stringify({ q: searchCriteria, sort, facets, apiAccessible }, { arrayFormat: 'brackets' })
}

export default {
  createTagFilterQueryString,
  createOrganizationFilterQueryString,
  createFilterQueryString,
  createQueryString
}
